import React, {useCallback, useEffect, useState} from "react";
import {
    ISectionDetailsVersionsQueryParametersDTO, ISectionDetailVersionDTO
} from "../../../../types/courseVersion.types.ts";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {COURSE_VERSIONS_URL} from "../../../../utils/apiUrl/courseVersionApiUrl.ts";
import {Card} from "antd";
import Spinner from "../../../general/Spinner.tsx";
import AddNewDetailsVersion from "./AddNewDetailsVersion.tsx";
import ContentVersionCard from "./ContentVersionCard.tsx";
import DetailsVersionList from "./DetailsVersionList.tsx";

interface IProps {
    sectionVersionId: string | null
}

const DetailsVersionTable = (props: IProps) => {
    const [currentDetailsVersionId, setCurrentDetailsVersionId] = useState<string | null>(null);
    const [sectionDetailsVersions, setSectionDetailsVersions] = useState<ISectionDetailVersionDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [query, setQuery] = useState<ISectionDetailsVersionsQueryParametersDTO>({
        courseSectionId: props.sectionVersionId,
        filterOn: 'title',
        filterQuery: '',
        sortBy: '',
        isAscending: true,
        pageSize: 5,
        pageNumber: 1,
    });

    const handleReloadTable = useCallback(() => {
        setReload(preReload => !preReload);
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };

    useEffect(() => {
        const getAllSectionVersions = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<IResponseDTO<ISectionDetailVersionDTO[]>>(COURSE_VERSIONS_URL.GET_SECTION_DETAILS_VERSIONS(query));
                setSectionDetailsVersions(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        }
        getAllSectionVersions();
    }, [query, reload]);

    const handleCurrentDetailsVersionId = useCallback((detailVersionId: string) => {
        setCurrentDetailsVersionId(detailVersionId);
    }, [])

    return (
        <>
            <Card className={'border-2 shadow-xl items-center text-left min-w-80 mt-6'}>
                <h1 className={'text-2xl font-bold text-green-800 my-6 text-center'}>Section Version Details</h1>
                <div className={'text-right my-6'}>
                    <AddNewDetailsVersion handleReloadTable={handleReloadTable}
                                          sectionVersionId={props.sectionVersionId}></AddNewDetailsVersion>
                </div>
                <div className={'flex justify-between w-full'}>
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

                <div className={'flex gap-4'}>
                    <div className={'w-4/12'}>
                        {
                            loading
                                ?
                                (<Spinner/>)
                                :
                                (
                                    <DetailsVersionList
                                        handleCurrentDetailsVersionId={handleCurrentDetailsVersionId}
                                        handleReloadTable={handleReloadTable}
                                        sectionDetailVersion={sectionDetailsVersions}
                                    >

                                    </DetailsVersionList>
                                )
                        }
                    </div>
                    <div className={'w-8/12'}>
                        <ContentVersionCard detailsVersionId={currentDetailsVersionId}></ContentVersionCard>
                    </div>
                </div>

            </Card>

        </>
    );
};

export default DetailsVersionTable;