import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
    console.log('vite', import.meta.env.VITE_SOME_KEY);
    console.log('vite', import.meta.env.VITE_API_MYWEATHER);

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
            const weatherApiUrl = import.meta.env.VITE_API_MYWEATHER + "/api/weatherforecast/getweather?zipCode=" + zipCode;
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
                        <h2>Widget</h2>
                        {weatherData ? <div className="weather-widget">
                            <div className="weather-widget__header">
                                <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
                                <p>{weatherData.location.localtime}</p>
                            </div>
                            <div className="weather-widget__body">
                                <img src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAHnZJREFUeF7tXXlg01Xyn3nftCltgUJzlqs0AUqL4LUr+lNXdF05PNb1WA9Yj/VYjxVxRVEBBQUED0QBTxRclZVFVFwVD1xRUVBZOVvaJmkptM3V9KRt0nzf/HyBpOkBTdq0pMf7M3lv3sy8z/cd82bmIfSWHq0B7NHS9woPvQDo4SDoBUAvAHq4Bnq4+L0zQC8AergGerj4vTNALwB6uAZ6uPi9M0AvAHq4Bnq4+L0zQC8AergGerj4PXIGyMiAWLcr+VoAZjdbHZ/2ZAz0RACwNJ36SwSYQABeBFpqtjof6Kkg6HEAMOp0mQTyLgCQxKAT0U6LzXlKLwB6iAYMGs1ZwGhrQFyibLPNmdFDxG8mZo+bAXoB0BgDvQDonQGifvKTDFr1swBwISGZvLX1NxRWVJS1leuOmAHSUtRnI4eniEMsQ/aiyWZ7ra38dXa7qJ8BjHrVLUT4ql8xMvA3CqylN7dVUZEGgDhS1jnVPyCDU4/yVArEMsw2m72tPHZmu+gHgFY1gxDFDOArBHCYgzSlwGrd0hZFRRoAxhTNPOI0N8AfUU1MXP2YnAMV+W3hr7PbRD0A0gYM6E9xip8YwQi/chDhC1OJ46IjeAivRBIAhpSUIcQ93yPg4IYZCjYUWB1XhMfViasd9QAQqknTaqcj8qUAASdWzpH+ll/iDCwNoaowogDQqFcDgxsCwCRyMWLn59rtws7QJUqXAAAAsDS9+r9IcG7QVJsVx/GMLIejOhxNG9RqIzDIAoSYI2sK/Wy2OX8TDg1Rd7hefy6j+o8BMDHQlmCZ2ea4N1xaJ7J+VwEAGPTqicBpAyD2aQABPGmxOR4KU4Fo0Kn/BQBXEmANAp9vtjqfCpMGGPSqL4Dw90GDn+eudY8/VFnpCpfWiazfZQAglGRQq9eCBNc0KIxsEqPzcotL94erRGOK+pQYqndll5QfCLetQa+6HQhXipnJ35YRTM+zOZ4Pl9aJrt+lAJA+SDXSXY/fMgaagOIYrDEXO27sREUKu8QvgHBSYCbi8I3F7pgAALwT+YhIV10KAL5ZQKd5CoDuD9oL7LbYnOMioo0QiBj1qlOJcIe/KhLVEeKfuuq1cpcDQEpKSnyc7N2KSCcf3cS9YrY5bw9h7CJSxedLUKraCoinC4Ic4M18qyNwEohIJ51IpMsBQOgmU6021krsFkay1WRzvgAAcifqDEYPU+k9bnYHJ3JLffs/bTKZ3J3ZfyT76pIACFcBRqNRyWurzsZ6Oo2Q9OIIiERKQExE4LVErJKQlxAwcx8ZNoV7tAyXn2iq320BMFqrHVPP+PVchrOQ0UgA1IWkeAInAOwDgO8QpXdMVmtWSO26aKVOBYBBq9Uk2WxlOwDqO0hfYod+Jwe6DAHORMT49vRDAJUMYBNn7FVLse3L9tA6XttRKlVfpSTx3Tbb4Y7q41h0Ow0ABq3mFUJ+HSM8yDmsHupwPPM1gDdSAhv1mmlEdCcAjI8UzYaTBtQj8q9QUjxmKrJtixR9oy5RTRA3Hwgv9+0nGc4zl9hfjhT9UOh0CgCE2RTJuxkBFH6mOMAPyPnTFnvphlAYPVYdYRvwePEFRBBWuYBhJri+xLB+mFaypg+JKR+uU1DfeECFAqREJUquw7ze7uKyzcXZngP1yYcccsqx+iIgFwGs6jPQOTsrCzzt4FtKU6vvB4luR8DhAToE2Wabo1Pd0zoFAKk63e8YyMITNwAAITQReYBooxIV87Jttr3hKnSEVnstR74QAFKbtmUS1p9ujLVMOC1WPidTmTZcr4hrjb7XS/BTTr1jT77XumnH4cScA3LD4AQ3JtjGGL85r6Q0uzWaTf83aJIvB8aEF3KzmQqJ7TfZbKPDpdme+p0CAMGgQadaDIS3A0L/ZgwTOQnwLe6un1dQXl4egkBo1GmeJuJ3BN8NiHaSAusnna7Mmfb7+JQxabEDQ6DVYpV6mWDTtjrLhu9qvT/lekYQNUmnQ5CHSLeZrM6vQ+kjTas9iSN/jBFcgv6LqMYNC4BgltnmeDcUepGq02kAEAwbB2nHk5fPAQRxl+9zy278YcF+IJpvsTnXHkdAZtAlrwJgwvjSiP8zMmJz7rg4of9v0pWh7fhD0CIngA+/rc1b9kFVkqOcqxszjFZE7z0mq+vfxyGFRr16AXG4DRCSm4MfKgDoXSXHR7McDmsILEW0SqcCwM+5Qae+gQhnIFILJlxyxnphbLbTWdKSpAa96kUg/FvwfwqJPDdOTMy767K+mbGNFpnI6arQJh9+el3lgc2/uBuv0QQ2RLrmWDPBUZe2V5qC1We8IvgMFezxSG4sw5X4hADANxsYjUo8XDGHE90EgIGNFxG5QaEcaykqym2+fqruJ4aLgvcSA/pi6RM3J1WfN045LFzhw60vloUla6v2rf1vTUajJYFDjkJBl+UUO3Na4HkmMFzSaKYj3IkIS81W+5vh8hDp+icMAH5BUnW6VAm984nDFYgYh4RrTTb71KaCpuv1p9WT9xOAhpvApER0Lb0zqea36cqAS1akFdRsmSKAlR9WZ7/0UfUoTg2nDiL+fVxy6YSmpwNx1ONcuQkZO5UIilDC1zG+34JoMR+fcAD4FTw8RTUKgA3LL7Z/3lTp5wEoDurUXwHAOf7/+sVj+dK7kqrGj1YO6ehBb4n+wrer9r29+XBmk03MArPNMbtpfXGBFQ/yhbzW87WlrKziRPB7rD6jBgDHU4pRr15EBLOC6tDcaf1z/jyhT/qJUqa7HmDGctf+LXs8DTwQlAKji8wlzsB18YniL9R+ox4Agwb1TVZ6435BhMCXPumMuL1Lbksaw04w9/YyuW7qotKyIifXBxTO6VOz3Tk51AE40fVOsApbFz9Np3kGge7z19QOkGz/mjOwvyZJatWw0zr19tf495ba3MfWVIz0U/IZtxTSZEuRbXP7qXc8hagGgIgJwBhpFzAM7PDvvTJx762TE8d0vGpC60GWCW5dWpazPcszKqjFv8xWx7WhUTixtaIaAAat+h5AWOZX0aBkqXj9/GRtvz6smRHpRKrxi/+5D9y7vKzhGEpUziUYn9/CsfBE8tlS39EOgA2AIG7KfOWWixN2z/hT37HRpkRhH7jqsdIDeUXeIBDAHLPN8US08dqUn6gFgLgj90qQC3jEkUNiKK+ZlVR+ilHZ3JwaBVpe9Un13mfXVweWJpLhI4vDcWkUsHZcFqIWAGk69U0I8Lqf+1FDpPwN89Qt385FgZZ3mj0VUxe6+gUshAQltVKMsbi4uCYK2DsmC1ELAIM2+QlA9oif82smxO+aM61fp7l/hztoYjM4+WFncbA/AQe4Kt/qWB8urc6sH7UASNNq3kKk6/3KmHdD36wrf5fQqc4S+wrqK3dZPIcKbXJ9vtUbW+KghHrOFbUeiomLAY9+oKJaNYB5RqTE0MjBkur9rbVlX+5wN1gHOc00251Pd+aAhttX1ALAoFN9C4Bn+wV6/u6kgxecGtfhZl9rqez+aHtt3uYdnviswvphskwhnzgQMZdzqEXgWrF3IaKlFpszYMMId3A6o37EAWDQJmqAxT1NHNOBmt/5+4VCEduPUMgVOC+/qHk4tUGj3gMMApuqdXOTqzJTY/p2lFJKXN6aNz+rNX/4Q82QimpKEv3QEQ/hEqEkAuwPwPsBogBEHyQ4TEAVCFANgDIhqQFYJQCXkKgGGIvjROZ8q3NSU56N+uSpxFFciR/XYQWRapHhFlOJI7AURlr+yANAr10GxO8Jg9GPzVbHxU3rGzTq/cDAb1yhz5aoabBKatHnL4y+mlUlAvjoh9r85R9UJhY5SU0A9QiQQ4R9EElsOhv1SUS1iMwLQMLjuNHsQBwOIUEVSTQERdg4Qh554RtvH8/MwsIjeY0y1OpEN4McQDim72ETJjnjeHWe3f5ee+Q8VtuIAyBNq3oLEQNrdwhMbzNbHWc2rZemU5kQ0HD09w4BQGWN7J3/z6rcT7fXib0FEVDOr5lD+wMwn20fASoGDR5aOGbcOGnkmIykseNO1fZPSpKQIVSVV3izs/eVmXPzXLt+2VFTYDapvW6vgMvgX2MXqwEo/wiI0AhEW1mM9I+8Q7btI5OTB3kVaEZEZQi68VUhgnstNkfAIBZqu1DqRRwARq3qEkJxfENVawyIr4kx6RFTiU1k/2hU0nQqS5DHLH36pEoeqlFEzN/noN1bPeu1CttOU70BCCoAwQYAPpu+Mi624A+TLnZP++uthv4DBoTUp9vthrWr3zjw4XvvKWoOV+mJowuQlyNSggAUERYyCW41Fds/N+jUwu/v6tb04xt84HsYuC8wWasdodQPt07EASAYGKZS6SUJzmPEjqs8plD8lFtc3GJsf5omeYdwovALtOr+AfbxGcqGsPBwJQ2qX+Ly1t75fLk9t9A7jDgUoJjOGWoAsXTypX903nHvjFGxsbFt6kGWZVj21KLiLz/exDjV2ziBEcTSwHAUIB1gyG7NK7ZvNg5WnQMeNvS4nSiwsgakLzrSltAhAGiT5po0MmjV/wGEKf6fl9za3zTlzD7GUGhXVBPstHgqiuzy4cNu8vbtAzED+0nK346OHSgBef++vNLyU457JBAWEvKBYr3un5SUM3/JM7r0zMzmXsuhdNqkTtGhg57HHpyZW1hQIDayMsiQCxKMJqB8xvAKU7HjlzaQjXiTqAVAmlr1Gkr4V7/Ed1/ed9cdlyS0aAgSRpj3t9VaP/ym1p5X5I2rrOWDkDChqbYQ6XCMxKxuD7iBcSUSDATEATq9fv/K1f8cmZCYGNFNppgNHp4xPWvnjp/TCUBGBOH6PYITbe2T7Dy/ncElEQFD1ALAoFHNAYbz/VKee5Jy34szBjRywTpcR/Tc+qq8Dd/VxNZ5goJDkKqBg4tQqgEiDogMSe5LQHWIkEDExA6+FhG0g4cNzXr5zbczFIojOaMiXYgIHpkxPWvHTz9mEJCI/SsTaeU40DP5Vmcg0UWk+w2VXtQCQOTw4TJs9wdR9EtgZZsWq/r1jz9yFbxhS23RgrVl9XUe5o8KKhbndkQQZ+tBLbhhi2aciA4BEkdgqYmJ8abX390wXOzsQ1VYW+pxWYa/XvvnfcVFhzLFPgAIhwBBtYzSZQVWa0iBJW3pN5Q2UQsAwXyaVvNLIBMIACy4uf/+KWfGpd/+jGvftmzPCESMRYKDHMmNgIH9AUN0KePjS5VxfQJRyDVVlfFutztFtBG0JUkqeWr5i/GZY8dGZM1vTdkup7N+2pV/snrrPUMIaB8CZgLBJ2abI7DPaY1GR/wf1QAQEcWAdKtf8N+OUuYUu2T5kMObIVyvmDC0AIpYOsYYc4wanVl80cWTVedfOHGQsk8gm1xAb4cKC+u//2ZLsdNhr7n48j8NHZo6vNk+oSOU7Ke5+pWXzWvXvJEGAJVAFEvCkHSC3ceiGgAjU9RnyzJ9AYjC/4+ISFjQBvw6GcQAQRUiDkOi2pNP+03ejEdmp2t1urad3Tpy1INoc87h2kunZJeXlY1GgL1EYADgP2Ks9FfTQbu5k9ho1E1UA0BwOlyn+pQBTvRPm8QhB5ESAXFQbExswfRZsxS/nzi50wJD2jtIr6x4wfTeO28L6+ABQOHrSDYgjOdAX0kAq0w250ft7SOc9lEPAKNOfTUHehIBhxKRSChhRcY8cbFx+Nyrr+mHGwydOo2Ho9yW6h6urqarJl1UInM5RQbaxwglBBgGKC6YqI4DvMcUylmmoqJD7e0rlPbRD4AhGgN56CNAGA2csoBhhjIuLm/5qjf0Q1OHN+TpDUXaKKnz4rJncz5Y9+5QAH/aWxS3iAUEYEDABCLYL2wg5mL79x3NctQDIE2jXgGIIj2sC5HE5VDtA3PnVlxw0eSGYIyO1lIH0P95+3bXR++9V7T7l//1qamp9p1gOAcnY1QJgGkijpAB3WmyOTd2QPcBklEBgGE63QSJ87uA0UAG8kqT1eVzo0pNSkqSlIpdgDgUOOSI6+FTT//NnkXLXgikae1I5XQGbbEx/Nc/38xf9+YaXltXayBCD3IyC7MxJzjIGF3ekaFmJxQAw/X6YUSeRxng1WLqEwongEPg9o4RQZQGvXr2r04lj3MACwNIi1HE7F/17ro0rU4f1bv9tgDncHW1POu+6Xty9+0Tbu8IhNmAlMEJfpbq5QtMLldlW+i21uaEACA1NTVOUVfzEAe6GUHcnzcqMpfwNOEllKZWb0QJLiFO+5BhZubJJ+96dsVLUesY2pqyW/vfZzb+x/SsHdt/FHYONwDaRUwkES612Owd4lrW6QAQ6dy4TPcGPbLUePQRNhSUOK44mpNXxAUMAaAKAEx6cM5j9vMnTtS2psiu/L+4QLrrxml78i2Wk8TNoTj9AIdSiqFzLEXOZkkz2itrpwFAZNnmhI8BwKSm2cJ8GyCCPAlopcnmFDn3+fAUzR8Yp02+czKgTpKk4o/++02KJHWo2b69+oxIe5vV6rnp6iucsiynEMB+BEhHwBUmq/3uiHQQRKRTADBKpUqpV+BWbCGdGxK5ZKS3qU6eG5whzKBX3QaEL/uORAjpSQOSs979z8ed6hYeaWWHQ+/5pxbv//iD99OJSLiPGcQyaLH70uJHNDF2pwBghFZ1LUd8J1gBwvkSCP4DwB612Gx7mirHoEt+AIAtBqLdgDh2RHr6ruWrVnfb9b+p/GUul/faS6dUEFEyEDkAUYXELjPZbBG1FHYKAIQnrIfBT4Tgy6aBgD9ylBdbSo6dJdSoU80jwLlEsBsRxo7OzNz13CuregwAhJ5uuf6aXQcLCsb5dQDE55htpRENOO0UAAhhRqWoRnk5E7v+A4Ot9ldayxNs0KlmAuASIr4HkZ00OiNj13Ovvt5pACg+eLBmxXPPmq3FRSTL/Lh6En9KEvOCuJ0ablDc99DDGZHwLnri4Yd3f7vlq7FAsBsQxgJRxB/H6DQAhLP+iboNewDKQsQMvT5lz+r1GzrFAFRZUe6ddsXlh+pqa5uloA1FjhHp6XuWr1rdbl7XvPKi6Z01a4zEKQsZiqPhBxabMxAuHwovrdWJYgDoJwJ5PwWgQwA4OCZGWfifr7cc34u2NWlD/P+h6ffs+9/PPzbOABZiW1EtLi7e8uHmr8S9f7uKHwC/PnEn8iiPIc7XW+ylV7WLaJPGUQsA3ysflRUmZKAnEpm5iT3/2uve9IzMDr3927t7V+U/7hCJSKlfWxU9/pz/2zvvyWfancbm1eUv5Kxf+/YoJNjv2z+hvNZc4rqurXy11C5qAeBbBjTqT4DBJL8Czp5wwd45Tyxot2KPp8Cbrr7yiO/e0RITQ4VTp9Z4kLDZO8VOF5M2bhR5iRsepkhITMh7a8NGY3xCQrt1++A9d+/cuePnkzngLwzoFCK2zGKzRfRl0nYzGUk0NqWVptPMQ6C5BJCDAKPi4pT56z75fLhSGXJUVVjsfbj+3cKVS5cKh9KAtemGm2pyZ808HMgCFkzw0ksH7sszSQGwEMLhuQsWVZ/9uwkRsVZePXlSdkVFmYglEGFyRk50a77N+VpYQrVSOaoBkKFW69wS7RRhZkRkRcRBF02+eP99j8yOeILIuro6uGbKJLO4kfPrbMBAnv3t16WjpRbim15cGV/w/PIEEa4eAMtZ556759FFS9q9+RP9/7R9W+kjM6b3BUTxIlkfAHLHueWMrLKywh4DAN8ykKJeDRxuAKJsQBwtMcn23KuvxY9MHx3RUPHF8+Zmf/X55w2PNRDVLXu+ouIPF9Y3+5oPHJA8Uy5JcsleFkhLH6dUFj44//EBwbOTPiUlLmXQkDYFHNx984278nL2j0OkXUQ4rqM8iKN6BhAAGKXRjPUy/jkAioEQlyEjE/smml5/d/3w/v0j489fmG+pve0vUw8T54GA1jFjvLv/va6sxYxkU6YkZVnyY1o3SxPVnT9xiuXBuXNbrxv0WX/y4QcHn1u8SMRBivGpQETxTsFNZqtjdSS/fkEr6gHgmwW06scBYbZ4swc4cmSg0mi02cvfWD2if1Jo0bvHU9ydN92w15ybE9hcMkb2jz8u65s6TG7mW753n6LuyqsGKFq60Gpxl82Yc+Pmr1WhBpvmZmdX3Pe328rrvfXDkORdhNI4AtpusTr/L9L3AF0GAKcBxJSpVZ+hhBNI2AUI+yFCv76J/XIXPPecftTojDYvB19/+YV14dzZA/0BI0Ipl11al/3kk1Utvt1TXY00/sxkpyz7vspWiyIm9uDGL78aIoUQ2b5/376Kmffc6fTUuYW7eAGRlAIIHs7hygK7/bNWO2tDhS4xAwi5RqtUeo+EGwHhdJGJQ4TxIwM1Irr+MGmy/a77H0gP93QgQrauuXRKTkV5eSDNa0I8mbd+X2pQirCNY5QPPlQeXLYsoaKmtuERrKpKSUvki1kIFAZYcef9D5Rfcvnlx33MQriFvfX66+a1a1b15Zw0SHSQAPsCQtKvNJdZbI6IHv2CeewyABBMj0xJTpc5E+/zjAFfanZwiWhb8V9MbMyh8WefU/HHK65OzRw3LgGxddFeWrYs9/11a4OPePLs2dVF119XG5bFceGTCXlvrkkYhkhBrmpYdetdd5dded31x6RVWVlBG/+9vmDj++vqKsoqxMkGfWllOOgQQcxq68xWhzD8RPQKuMsCQDA+TKsdHsP56yTBeT5BCLIBaIA/o6hQVmxc7EGtWlfVLymJq3U6xUWTJutOPWN8owyjLpfTM/WPl/mcLvwKkSSynXZavcgUEih6HZfuv796pEpFLe7mH5+fkPv22oTUJoNfecvf7y676prrG33532/52rr5i012p93JS+0OhcNp14O47j3iC1kFQIUIKIDAiPP3BthLr+vAV1Z9Mrb+mbRhXenoJsJdrM6lWQTAb0JAMe2KB5hyyScPDW+afwcJyp999TXMyBwTCAR9+B/T9+zYtj2kM3uK1pu1+b9lzXbyTyxIyH3rrWaDX3Xb3+8pveKaaxtdJG377jv7ow/eL+IYGj9nS1QMCE4iTBX7GiAq/zVbyUpziWPOkdfpO7Z0SQD4VSJCyGUOD+IRNzOf7d6Xr19EDxFWEtLRqRPx9LPOMi94+tmAT92fJ194SkV5VUgmxfgEiv/hB2etQhIf6pHy8ssJ8S+sTPCQ1xetdKQgsHN+d37WIwsXNnv7cMadt4/O2rkrVXCIAEiESkRKAvQdbwXfbkD8nAE9Y7I6t3TssDdQ79IA8IshXgp3I00DlM8GwrG+FG1BhdAXSDoxONLGqFcvPPoMTas60Kh51pYtpYEZYPHihLw3VvcZGjzTkMgMhmympcT+UkuDZ9SqLiWAddA4OxgHohxO+KOkwHdEAqnOGvgGzHZ2jx3cn0hQFRNDv5c5G8rEFya+Nhm/sjgc4sWx4ILGFPXNnGPGr49VBlLDIPo2lcEx+/TQw9UH/jL1iG/As0sTcl99pc/QoxHLPnoi8wcDNtNktb94PPGMuoFXEbAzRHJJIizFGGm36ZD1286Y6o/FV6vo7+DxijryaTr1RgS4xM9Y0kA5Z+s3rlGMAaxYHm9+YUW8vvGz9CIrKM4yFzteiDphQmCoFwBBSkrV6c5TkPdTOpKPwFdmPlBdcPONtakrVsably+P1wdf/QJRLRCbY7bbnwlB11FZpRcAQcOSplW9j4h/DHz9/Xnu1q2lI1esjLesXBnf6N4fgGqBs7lmuz2qs4G3hrpeABzV0HC9/lzG6zcFv0Z+333VBW4P0orl8dpGX343GXwhei8AjgLAqNOsJ6Ar/F9Mv348d+r1dTErXuqjaZRzUCSLJphtsjufbe3r6gr/9wIAAEYM1p4he+XN/ghlMXBpBvmA2SKpkKDBB5GoDgjmRPsjEOEArxcA4iVznfpdCkreTEiHUbxmEOTrB91w8HuXAHHBNFj3W6/X+1Xw19/0CxLWRQKal28rXRjO19UV6vb4GcCgU68FAJGCpsUiMnYQyN1y8Hv8DJA2RHU6eHCz7xKmhSIGnyF/0mR1PtoVvua28NijZwCjXvM2EbUYaOHL1YN8sdnqnNsWxXaVNj0WAD5nU6RvAKFZrmDf4IO8xGwrFVey3br0WAAY9Ko3gXBa8w2fmPZhkclqF9lMun3pkQDI0Oky3eT9VjwWETzCImkFY7jIVGzvtmt+U0T3SAAYNOrVwOCGnj74PfIUkDZINRK9sC346/e9FYiwxFzimN3t5/wmAva4GcCo1V5GyD/w64EAvIDwlKXE8XBPG/weOQP48g+6NJsBSLxLzAHoGbPV+UBPHPweCQAh9ODBg/vEynU3MIAqU4lTZC87dhRIN0dGj1sCuvl4hi1eLwDCVln3atALgO41nmFL0wuAsFXWvRr0AqB7jWfY0vQCIGyVda8GvQDoXuMZtjS9AAhbZd2rQS8Autd4hi1NLwDCVln3atALgO41nmFL0wuAsFXWvRr0AqB7jWfY0vw/kmw2NRBleKcAAAAASUVORK5CYII=`} alt="" />
                                {/*<img src={weatherData.current.weather_Icons[0]} />*/}
                                <div className="weather-widget__temp">
                                    <p>{weatherData.current.temperature}&deg;C</p>
                                </div>
                            </div>
                            <div className="weather-widget__footer">
                                <p>{weatherData.current.weather_Descriptions[0]}</p>
                                <p>Feels like {weatherData.current.feelslike}</p>
                            </div>
                            <div className="weather-widget__footer">
                                <p>Humidity: {weatherData.current.temperature}%</p>
                                <p>Wind Speed: {weatherData.current.wind_Speed}m/s</p>
                            </div>
                        </div>
                            : <div>Opps! Weather not found!</div>}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;