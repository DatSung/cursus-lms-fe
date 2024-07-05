import React, {useEffect, useState} from "react";
import {ICourseDTO} from "../../../../types/course.types.ts";
import {ICourseVersionDTO, ICourseVersionsQueryParametersDTO} from "../../../../types/courseVersion.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSES_URL} from "../../../../utils/apiUrl/courseApiUrl.ts";
import AddNewCourse from "./AddNewCourse.tsx";
import Spinner from "../../../general/Spinner.tsx";
import CloneNewCourseVersion from "./CloneNewCourseVersion.tsx";

interface IProps {
    courseId: string | null
}

const CourseVersionsTable = (props: IProps) => {

    const [course, setCourse] = useState<ICourseDTO>();
    const [courseVersions, setCourseVersions] = useState<ICourseVersionDTO[]>([]);
    const [reload, setReload] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<ICourseVersionsQueryParametersDTO>({
        courseId: '',
        filterOn: 'title',
        filterQuery: '',
        sortBy: '',
        isAscending: true,
        pageSize: 5,
        pageNumber: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };

    const handleReloadTable = () => {
        setReload(!reload);
    }

    useEffect(() => {
        const getAllCourseVersions = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<IResponseDTO<ICourseVersionDTO[]>>(COURSES_URL.GET_ALL_COURSES(query));
                setCourseVersions(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        }
        getAllCourseVersions();
    }, [query, reload]);

    const renderCourseVersions = (courseVersions: ICourseVersionDTO[]) => {
        return courseVersions.map((courseVersion) => (
            <div key={courseVersion.id}>

            </div>
        ));
    };

    return (
        <>
            <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterOn">
                        Search By
                    </label>
                    <input
                        type="text"
                        id="filterOn"
                        name="filterOn"
                        value={query.filterOn}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter filter on"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterQuery">
                        Search Input
                    </label>
                    <input
                        type="text"
                        id="filterQuery"
                        name="filterQuery"
                        value={query.filterQuery}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter filter query"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortBy">
                        Sort By
                    </label>
                    <input
                        type="text"
                        id="sortBy"
                        name="sortBy"
                        value={query.sortBy}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter sort criteria"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isAscending">
                        Sort Type
                    </label>
                    <select
                        id="isAscending"
                        name="isAscending"
                        value={query.isAscending.toString()}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="true">Ascending</option>
                        <option value="false">Descending</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageSize">
                        Page Size
                    </label>
                    <input
                        type="number"
                        id="pageSize"
                        name="pageSize"
                        value={query.pageSize.toString()}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter page size"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageNumber">
                        Page Number
                    </label>
                    <input
                        type="number"
                        id="pageNumber"
                        name="pageNumber"
                        value={query.pageNumber.toString()}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter page number"
                    />
                </div>
            </div>

            {
                loading
                    ?
                    (<Spinner/>)
                    :
                    (
                        <div className={'w-full flex flex-wrap gap-2 justify-evenly items-center mt-6'}>
                            {courseVersions.length > 0
                                ?
                                (
                                    renderCourseVersions(courseVersions)
                                )
                                :
                                (
                                    <p>There are no course</p>
                                )
                            }
                        </div>
                    )
            }

        </>
    );
};

export default CourseVersionsTable;