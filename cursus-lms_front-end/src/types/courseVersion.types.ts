export interface ICourseVersionsQueryParametersDTO {
    courseId: string | null;
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ICourseVersionDTO {
    id: string,
    courseId: string,
    title: string,
    code: string,
    description: string,
    learningTime: string,
    price: number,
    oldPrice: number,
    courseImgUrl: string,
    instructorId: string,
    instructorEmail: string,
    categoryId: string,
    categoryName: string,
    levelId: string,
    levelName: string,
    version: string,
    currentStatus: number,
    currentStatusDescription: string
}

export interface ICloneCourseVersionDTO {
    courseVersionId: string;
}

export interface IEditCourseVersionDTO {
    id: string;
    title: string;
    code: string;
    description: string;
    learningTime: string;
    price: number;
    categoryId: string;
    levelId: string;
}

export interface ICourseSectionVersionsQueryParametersDTO {
    courseVersionId: string | null;
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ICourseSectionVersionDTO {
    id: string;
    title: string;
    description: string;
    currentStatus: number;
    statusDescription: string
}

export interface ICreateCourseSectionVersionDTO {
    courseVersionId: string | null;
    title: string;
    description: string;
}

export interface ISectionDetailsVersionsQueryParametersDTO {
    courseSectionId: string | null;
    filterOn: string,
    filterQuery: string,
    sortBy: string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number
}

export interface ISectionDetailVersionDTO {
    id: string,
    courseSectionDetail: string,
    name: string,
    videoUrl: string,
    slideUrl: string,
    docsUrl: string,
    type: number,
    currentStatus: string
}

export interface ICreateSectionDetailVersionDTO {
    courseSectionVersionId: string | null
    name: string
}

export interface IEditSectionDetailVersionDTO {
    sectionDetailId: string | null
    courseSectionId: string | null
    name: string
}

export interface IDetailsContentVersionDTO {

}