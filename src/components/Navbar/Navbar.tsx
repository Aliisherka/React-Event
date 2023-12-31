import { Layout, Menu, Row } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedselector } from "../../hooks/useTypedSelector";


const Navbar: FC = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useTypedselector(state => state.auth);
    const { logout } = useActions();

    const publicItems = [
        {label: 'Login', key: 'login', path: '/login'}
    ]

    const privateItems = [
        {label: 'Exit', key: 'exit', path: '/login'}
    ]

    const navigateTo = (key: string, items: any) => {
        const item = items.find((item: any) => item.key === key);
        item && navigate(item.path);
    }

    const logoutPage = (key: string, items: any) => {
        logout()
        navigateTo(key, items)
    }

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ? (
                    <>
                        <div style={{ color: "white" }}>{user.username }</div>
                        <Menu
                            items={privateItems}
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            onClick={(e) => {
                                logoutPage(e.key, privateItems)
                            }}
                        />
                    </>
                ) : (
                    <Menu
                        items={publicItems}
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        onClick={(e) => navigateTo(e.key, publicItems)}
                    />
                )}
            </Row>
        </Layout.Header>
    );
}

export default Navbar;