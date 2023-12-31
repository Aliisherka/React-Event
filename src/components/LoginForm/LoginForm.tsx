import { Button, Form, Input } from "antd"
import { FC, useState } from "react"
import { useActions } from "../../hooks/useActions";
import { useTypedselector } from "../../hooks/useTypedSelector";
import { rules } from "../../utils/rules";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LoginForm: FC = () => {
    const {isLoading, error} = useTypedselector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useActions();

    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {error && <p style={{color: 'red'}}>{error}</p>}
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input value={password} onChange={e => setPassword(e.target.value)} type={'password'}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm