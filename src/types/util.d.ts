import { NoticeType } from 'antd/es/message/interface';

interface msgModel { // 消息提示
    type?: NoticeType | undefined,
    content: string,
    duration?: number
}

interface SingleOption { // 单个选项
    text: string;
    value: string;
}

interface SelectOptions { // 选项列表
    [key: string]: SingleOption[];
}

interface keyValueMap { // 选项的text、value对
    [key: string]: string
}

export { msgModel, SingleOption, SelectOptions, keyValueMap };