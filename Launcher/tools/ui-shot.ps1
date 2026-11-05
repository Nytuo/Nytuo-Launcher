# Dev helper: optionally click at window-relative (x, y), then screenshot the launcher window.
# usage: pwsh tools/ui-shot.ps1 -Out shot.png [-X 400 -Y 600] [-Wheel -3] [-Wait 1500]
param([string]$Out, [int]$X = -1, [int]$Y = -1, [int]$Wheel = 0, [int]$Wait = 1500, [string]$Key = "")
Add-Type -AssemblyName System.Windows.Forms, System.Drawing
Add-Type @"
using System; using System.Runtime.InteropServices;
public class W {
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern void mouse_event(int f, int dx, int dy, int d, int e);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L, T, R, B; }
}
"@
$p = Get-Process nytuo-launcher -ErrorAction Stop | Select-Object -First 1
[W]::SetForegroundWindow($p.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 400
$r = New-Object W+RECT; [W]::GetWindowRect($p.MainWindowHandle, [ref]$r) | Out-Null
if ($X -ge 0) {
  [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(($r.L + $X), ($r.T + $Y))
  Start-Sleep -Milliseconds 150
  if ($Wheel -ne 0) { [W]::mouse_event(0x0800, 0, 0, $Wheel * 120, 0) }
  else { [W]::mouse_event(0x0002, 0, 0, 0, 0); [W]::mouse_event(0x0004, 0, 0, 0, 0) }
}
if ($Key -ne "") { [System.Windows.Forms.SendKeys]::SendWait($Key) }
Start-Sleep -Milliseconds $Wait
$w = $r.R - $r.L; $h = $r.B - $r.T
$bmp = New-Object System.Drawing.Bitmap $w, $h
[System.Drawing.Graphics]::FromImage($bmp).CopyFromScreen($r.L, $r.T, 0, 0, $bmp.Size)
$bmp.Save($Out); Write-Output "saved $Out ($w x $h)"
