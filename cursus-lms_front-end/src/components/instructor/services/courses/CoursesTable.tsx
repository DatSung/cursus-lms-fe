import React, {useEffect, useState} from "react";
import {ICourseQueryParameters, ICourseDTO} from "../../../../types/course.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {COURSES_URL} from "../../../../utils/apiUrl/courseApiUrl.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import CourseCard from "./CourseCard.tsx";
import Spinner from "../../../general/Spinner.tsx";
import AddNewCourse from "./AddNewCourse.tsx";
import {Card} from "antd";


const CoursesTable = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<ICourseDTO[]>([]);
    const [reload, setReload] = useState<boolean>(true);
    const [query, setQuery] = useState<ICourseQueryParameters>({
        instructorId: '',
        filterOn: 'title',
        filterQuery: '',
        sortBy: '',
        fromPrice: -1,
        toPrice: 0,
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
        const getAllCourses = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<IResponseDTO<ICourseDTO[]>>(COURSES_URL.GET_ALL_COURSES(query));
                setCourses(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        }
        getAllCourses();
    }, [query, reload]);

    const renderCourses = (courses: ICourseDTO[]) => {
        return courses.map((course) => (
            <div key={course.id}>
                <CourseCard course={course}></CourseCard>
            </div>
        ));
    };

    return (
        <Card>
            <div className={`flex px-4 mb-4 flex-row-reverse`}>
                <AddNewCourse handleReloadTable={handleReloadTable}></AddNewCourse>
            </div>

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
                            {courses.length > 0
                                ?
                                (
                                    renderCourses(courses)
                                )
                                :
                                (
                                    <p>There are no course</p>
                                )
                            }
                        </div>
                    )
            }

        </Card>
    );
};

export default CoursesTable;