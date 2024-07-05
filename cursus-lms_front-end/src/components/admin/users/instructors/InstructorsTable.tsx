import SignalRService from "../../../../utils/signalR/signalRService.ts";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";
import {IInstructorInfoLiteDTO} from "../../../../types/instructor.types.ts";
import {IQueryParameters} from "../../../../types/category.types.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";
import Spinner from "../../../general/Spinner.tsx";
import Button from "../../../general/Button.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_ADMIN} from "../../../../routes/paths.ts";
import ExportInstructor from "./ExportInstructor.tsx";


const InstructorsTable = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [instructors, setInstructors] = useState<IInstructorInfoLiteDTO[]>([]);
    const [query, setQuery] = useState<IQueryParameters>(
        {
            filterOn: 'name',
            filterQuery: '',
            sortBy: '',
            pageSize: 5,
            pageNumber: 1,
            isAscending: true
        }
    )

    useEffect(() => {
        const getInstructors = async (query: IQueryParameters) => {
            try {
                const response = await axiosInstance.get<IResponseDTO<IInstructorInfoLiteDTO[]>>(INSTRUCTORS_URL.GET_ALL_INSTRUCTORS_URL(query));
                setInstructors(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        }
        getInstructors(query);
    }, [query]);

    const renderInstructors = (instructors: IInstructorInfoLiteDTO[]) => {
        return instructors.map((instructor, index) => (
            <React.Fragment key={instructor.instructorId}>
                <tr className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{instructor.fullName}</td>
                    <td className="py-3 px-6 text-left">{instructor.email ?? '-'}</td>
                    <td className="py-3 px-6 text-left">{instructor.phoneNumber ?? '-'}</td>
                    <td className="py-3 px-6 text-left">{instructor.gender ?? '-'}</td>
                    <td className="py-3 px-6 text-left">{formatTimestamp(instructor.birthDate)}</td>
                    <td className="py-3 px-6 text-left">{instructor.isAccepted ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-6 text-left">
                        <Button
                            label='Detail'
                            variant='primary'
                            type='button'
                            onClick={() => navigate(PATH_ADMIN.instructorInfo + "?instructorId=" + instructor.instructorId)}
                        >
                        </Button>
                    </td>
                </tr>
            </React.Fragment>
        ));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    }

    SignalRService.on("DownloadExcelNow", async (fileName: string) => {
        const response = await axiosInstance.get(INSTRUCTORS_URL.DOWNLOAD_INSTRUCTORS_URL(fileName), {responseType: 'blob'});
        // Create a url from blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        // File name after download
        link.setAttribute('download', `${fileName}`);

        // Add link to dom to download the file
        document.body.appendChild(link);
        link.click();

        // Delete the link after download
        link.parentNode?.removeChild(link);
    });

    return (
        <>
            <ExportInstructor></ExportInstructor>
            <div className='flex justify-between'>
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

            {loading ? (
                <Spinner/>
            ) : (
                <table className="min-w-full bg-white border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                        <th className="text-left text-nowrap py-4 px-6">No</th>
                        <th className="text-left text-nowrap py-4 px-6">Name</th>
                        <th className="text-left text-nowrap py-4 px-6">Email</th>
                        <th className="text-left text-nowrap py-4 px-6">Phone Number</th>
                        <th className="text-left text-nowrap py-4 px-6">Gender</th>
                        <th className="text-left text-nowrap py-4 px-6">Birth Date</th>
                        <th className="text-left text-nowrap py-4 px-6">Is Accepted</th>
                        <th className="text-left text-nowrap py-4 px-6">Actions</th>
                        {/* Add more headers as needed */}
                    </tr>
                    </thead>
                    <tbody>{renderInstructors(instructors)}</tbody>
                </table>
            )}
        </>
    );
};

export default InstructorsTable;