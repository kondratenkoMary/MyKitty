using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ChatClient
{
    public class UICommand : ICommand
    {
        protected Action Action = null;
        private bool _CanExecute = true;

        public UICommand(Action action, bool canExecute = true)
        {
            //  Set the action.
            Action = action;
            _CanExecute = canExecute;
        }
        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public void Execute(object parameter)
        {
            Action();
        }
    }
}
