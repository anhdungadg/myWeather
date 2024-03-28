import { useEffect, useState } from 'react';
import axios from 'axios';
//import './App.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    CloudOutlined,
    VideoCameraOutlined,
    QuestionCircleOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, AutoComplete, Flex, notification, Space } from 'antd';
import ZipCodeComponent from './ZipCodeComponent';
const { Header, Sider, Content } = Layout;

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});


const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fetchData = async () => {
        try {
            var zipCode = value;
            if (!zipCode) zipCode = 30076;
            console.log(zipCode);
            const weatherApiUrl = "https://localhost:7047/api/weatherforecast/getweather?zipCode=" + zipCode;
            const response = await axios.get(weatherApiUrl);
            setWeatherData(response.data);
            setErrorData(null);
            //console.log('response.data', response.data);
        } catch (error) {
            console.error(error);
            setErrorData(error);
            /*openNotificationWithIcon('error');*/
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    /*postion !== undefined ? console.log('postion', postion) : console.log('null pos');*/
    var contents = weatherData === null
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>windSpeed</th>
                    <th>shouldGoOutside</th>
                    <th>shouldWearSunscreen</th>
                    <th>canFlyKite</th>
                </tr>
            </thead>
            <tbody>
                <tr key={weatherData.location.localtime}>
                    <td>{weatherData.location.localtime}</td>
                    <td>{weatherData.current.temperature}</td>
                    <td>{weatherData.current.wind_speed}</td>
                    <td>{weatherData.shouldGoOutside == true ? "OK" : "Stay at home"}</td>
                    <td>{weatherData.shouldWearSunscreen == true ? "OK" : "NOT OK"}</td>
                    <td>{weatherData.canFlyKite == true ? "OK" : "NOT OK"}</td>
                </tr>
            </tbody>
        </table>;
    console.log('weatherData', weatherData);


    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [anotherOptions, setAnotherOptions] = useState([]);
    const getPanelValue = (searchText) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
    const onSelect = (data) => {
        console.log('onSelect', data);
    };
    const onChange = (data) => {
        setValue(data);
    };

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log('position', position.coords.latitude, position.coords.longitude);
                //alert(position.coords.latitude, position.coords.longitude);
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    };

    // START: Notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };
    // END: Notification

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <CloudOutlined />,
                            label: 'myWeather',
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div>
                        <h1 id="tabelLabel">Weather forecast</h1>
                        {/*<ZipCodeComponent />*/}
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onChange={onChange}
                            onSearch={(text) => setOptions(getPanelValue(text))}
                            placeholder="Your ZipCode"
                        />
                        <Button type="primary" onClick={fetchData} icon={<QuestionCircleOutlined />}>Weather</Button>
                        <Button type="dashed" onClick={getLocation} icon={<EnvironmentOutlined />}>My Location</Button>
                        {errorData ? <div>ERROR! ZipCode like 30076</div>:""}
                        <p>This component demonstrates fetching data from the server.</p>
                        {contents}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;