import { NoticeType } from 'antd/es/message/interface';

interface msgModel {
    type?: NoticeType | undefined,
    content: string,
    duration?: number
}

export { msgModel };