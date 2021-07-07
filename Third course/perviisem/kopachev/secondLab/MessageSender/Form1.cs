using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MessageSender
{
    
    public partial class Form1 : Form
    {
        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern uint RegisterWindowMessage(string lpString);
        private const uint WM_COPYDATA = 0x004A;

        private SharedMemoryService _SharedMemoryService;
        private PipeService _PipeService;
        private SendMessageService _SendMessageService;

        public Form1()
        {
            InitializeComponent();
            var random = new Random().Next(99);
            this.Text = "MessageSender" + random.ToString();

            textBox2.Text = "Pipe" + random.ToString();
            _SharedMemoryService = new SharedMemoryService(textBox4.Text);


            _PipeService = new PipeService( textBox3.Text, textBox2.Text);
            _PipeService.OnReceive += _PipeService_OnReceive;

            _SendMessageService = new SendMessageService(textBox5.Text);
        }

        private void _PipeService_OnReceive(object sender, string text)
        {
            Invoke((MethodInvoker) delegate { textBoxReceive.AppendText("Pipe: "+ text + Environment.NewLine); });
        }

        private void button1_Click(object sender, EventArgs e)
        {
            _PipeService.Send(textBox1.Text);
        }

        private void button4_Click(object sender, EventArgs e)
        {
            _PipeService.SetPipeReceive(textBox2.Text);
        }

        private void button5_Click(object sender, EventArgs e)
        {
            _PipeService.SetPipeSend(textBox3.Text);
        }
        protected override void OnClosed(EventArgs e)
        {
            _PipeService.Dispose();
            _SharedMemoryService.Dispose();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            _SharedMemoryService.Write(textBox1.Text);
        }

        private void button6_Click(object sender, EventArgs e)
        {
            var result = _SharedMemoryService.Read();
            textBoxReceive.AppendText("Shared Memory: " + result + Environment.NewLine);
        }

        private void button7_Click(object sender, EventArgs e)
        {
            _SharedMemoryService.SetShareName(textBox4.Text);
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == WM_COPYDATA)
            {
                COPYDATASTRUCT cd = (COPYDATASTRUCT)m.GetLParam(typeof(COPYDATASTRUCT));

                byte[] B = new byte[cd.cbData];
                IntPtr lpData = cd.lpData;

                Marshal.Copy(lpData, B, 0, cd.cbData);
                string strData = Encoding.Default.GetString(B);


                var result = strData;

                textBoxReceive.AppendText("Send Message: " + result + Environment.NewLine);

            }
            base.WndProc(ref m);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            _SendMessageService.Send(textBox1.Text);
        }

        private void button8_Click(object sender, EventArgs e)
        {
            _SendMessageService.SetWindowName(textBox5.Text);
        }
    }
}
