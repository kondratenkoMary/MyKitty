import React from "react";
import { useFormState } from "react-use-form-state";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logIn } from "../Actions/userLoginActions";

export interface ILoginPageState {
    login: string;
    password: string;
    showPswd: boolean;
}

const LoginPage = function () {
    const dispatch = useDispatch();
    const [formState, { text, label, password, checkbox }] = useFormState<ILoginPageState>(
        {},
        {
            withIds: true
        }
    );

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formState.values.login || !formState.values.password) {
            return;
        }

        dispatch(logIn(formState.values.login, formState.values.password, 0));
    };

    return (
        <div className="position-absolute core-login-form d-flex align-items-center justify-content-center">
            <div className="w-100 border p-4 bg-white">
                <form onSubmit={onSubmit}>
                    <div className="h3 text-center mb-4" style={{ padding: 20 }}>
                        Вход
                    </div>
                    <div className="grey-text">
                        <Form.Group>
                            <Form.Label {...label("login")}>Логин</Form.Label>
                            <Form.Control required {...text("login")} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label {...label("password")}>Пароль</Form.Label>
                            <Form.Control required {...(formState.values.showPswd ? text : password)("password")} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check {...checkbox("showPswd")} type="checkbox" inline />
                            <Form.Label {...label("showPswd")}>Показать пароль</Form.Label>
                        </Form.Group>
                    </div>
                    <div className="text-center">
                        <Button type="submit" onClick={onSubmit}>
                            Войти
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
