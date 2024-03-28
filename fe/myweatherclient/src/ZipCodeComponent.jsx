import React, { useState } from 'react';
import { AutoComplete, Button, Flex } from 'antd';
import { QuestionCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

function ZipCodeComponent() {
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
    return (
        <>
            <AutoComplete
                options={options}
                style={{
                    width: 200,
                }}
                onSelect={onSelect}
                onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder="Your ZipCode"
            /> 
            <Button type="primary" icon={<QuestionCircleOutlined />}>Weather</Button>
            <Button type="dashed" icon={<EnvironmentOutlined />}>My Location</Button>
        </>
    );

}

export default ZipCodeComponent;