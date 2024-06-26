export interface IEmailTemplateDTO {
    id: string | undefined;
    templateName: string;
    senderName: string;
    senderEmail: string;
    category: string;
    subjectLine: string;
    preHeaderText: string;
    personalizationTags: string;
    bodyContent: string;
    footerContent: string;
    callToAction: string;
    language: string;
    recipientType: string;
    createBy: string
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    status: number;
}

export interface IUpdateEmailTemplateDTO {
    templateName: string;
    senderName: string;
    senderEmail: string;
    category: string;
    subjectLine: string;
    preHeaderText: string;
    personalizationTags: string;
    bodyContent: string;
    footerContent: string;
    callToAction: string;
    language: string;
    recipientType: string;
    status: number;
}