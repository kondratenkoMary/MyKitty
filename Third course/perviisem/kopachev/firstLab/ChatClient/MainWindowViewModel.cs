using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ChatClient
{
    public class MainWindowViewModel: INotifyPropertyChanged
    {
        private TCPService _Service;
        public MainWindowViewModel()
        {
            SendCommand = new UICommand(OnSendCommandExecuted);
            _Service = new TCPService();
            if (!_Service.Connect("localhost", 8080))
            {
                ChatMessages = "Не удалось подключиться к серверу";
                return;
            }

            _Service.OnDataReceived += _Service_OnDataReceived;
        }

        private void _Service_OnDataReceived(string message)
        {
            ChatMessages += $"{Environment.NewLine}{message}";
        }

        public ICommand SendCommand { get; set; }
        public void OnSendCommandExecuted()
        {
            _Service.Send($"{ UserName}: { MessageToSend}");
        }

        public string _ChatMessages;
        public string ChatMessages
        {
            get
            {
                return _ChatMessages;
            }
            set
            {
                if (_ChatMessages != value)
                {
                    _ChatMessages = value;
                    OnPropertyChanged("ChatMessages");
                }
            }
        }

        private string _MessageToSend;
        public string MessageToSend
        {
            get
            {
                return _MessageToSend;
            }
            set
            {
                if (_MessageToSend != value)
                {
                    _MessageToSend = value;
                    OnPropertyChanged("MessageToSend");
                }
            }
        }

        private string _UserName;
        public string UserName
        {
            get
            {
                return _UserName;
            }
            set
            {
                if (_UserName != value)
                {
                    _UserName = value;
                    OnPropertyChanged("UserName");
                }
            }
        }


        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
