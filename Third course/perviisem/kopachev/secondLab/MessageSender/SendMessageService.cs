using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MessageSender
{
    public class SendMessageService
    {
        [DllImport("user32.dll")]
        public static extern IntPtr FindWindow(string lpClassName, String lpWindowName);
        [DllImport("user32.dll")]
        public static extern IntPtr SendMessage(IntPtr hWnd, UInt32 wMsg, IntPtr wParam, ref COPYDATASTRUCT lParam);
       
        private const uint WM_COPYDATA = 0x004A;

        public SendMessageService(string winName)
        {
            WindowName = winName;
        }

        public string WindowName { get; private set; }
        public void SetWindowName(string text)
        {
            WindowName = text;
        }
        public void Send(string text)
        {
            IntPtr WindowToFind = FindWindow(null, WindowName);
            IntPtr lpData = Marshal.StringToHGlobalAnsi(text);

            COPYDATASTRUCT cd = new COPYDATASTRUCT();
            cd.lpData = lpData;
            cd.dwData = IntPtr.Zero;
            cd.cbData = text.Length;

            
            SendMessage(WindowToFind, WM_COPYDATA, IntPtr.Zero, ref cd);
        }
    }
    [StructLayout(LayoutKind.Sequential)]
    public struct COPYDATASTRUCT
    {
        public IntPtr dwData;
        public int cbData;
        public IntPtr lpData;
    }
}
