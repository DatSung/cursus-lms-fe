import React, {useCallback, useEffect, useState} from 'react';
import axiosInstance from '../../../../utils/axios/axiosInstance.ts';
import {IAdminCategoryDTO, IQueryParameters} from '../../../../types/category.types.ts';
import {CATEGORIES_URL} from '../../../../utils/apiUrl/categoryApiUrl.ts';
import {IResponseDTO} from '../../../../types/auth.types.ts';
import Spinner from '../../../general/Spinner.tsx';
import CategoryDetails from "./CategoryDetails.tsx";
import AddNewCategory from "./AddNewCategory.tsx";
import AddSubCategory from "./AddSubCategory.tsx";
import EditCategory from "./EditCategory.tsx";
// import {formatTimestamp} from "../../../../utils/funcs/formatDate.ts";

const CategoriesTable = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<IAdminCategoryDTO[]>([]);
    const [query, setQuery] = useState<IQueryParameters>(
        {
            filterOn: 'name',
            filterQuery: '',
            sortBy: '',
            pageSize: 5,
            pageNumber: 1,
            isAscending: true,
        }
    );
    const [reload, setReload] = useState<boolean>(true);

    const handleReloadTable = useCallback(() => {
        setReload(preReload => !preReload);
    }, [])

    useEffect(() => {
        const getCategories = async (query: IQueryParameters) => {
            try {
                const response = await axiosInstance.get<IResponseDTO<IAdminCategoryDTO[]>>(CATEGORIES_URL.SEARCH_CATEGORIES_URL(query));
                setCategories(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };
        getCategories(query);
    }, [query, reload]);

    const renderCategories = (categories: IAdminCategoryDTO[]) => {
        return categories.map((category, index) => (
            <React.Fragment key={category.id}>
                <tr className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{category.name}</td>
                    <td className="py-3 px-6 text-left">{category.parentName ?? '-'}</td>
                    <td className="py-3 px-6 text-left">{category.description ?? '-'}</td>
                    {/*<td className="py-3 px-6 text-left">{category.createdBy ?? '-'}</td>*/}
                    {/*<td className="py-3 px-6 text-left">{formatTimestamp(category.createTime)}</td>*/}
                    {/*<td className="py-3 px-6 text-left">{category.updatedBy ?? '-'}</td>*/}
                    {/*<td className="py-3 px-6 text-left">{formatTimestamp(category.updateTime)}</td>*/}
                    <td className="py-3 px-6 text-left">{category.statusDescription}</td>
                    <td className="py-3 px-6 flex gap-2 text-left">
                        <AddSubCategory
                            handleReloadTable={handleReloadTable}
                            parentId={category.id}
                            parentName={category.name}
                        >
                        </AddSubCategory>
                        <EditCategory
                            handleReloadTable={handleReloadTable}
                            category={category}
                        ></EditCategory>
                        <CategoryDetails categoryId={category.id}></CategoryDetails>
                    </td>
                </tr>
                {category.subCategories.length > 0 && renderCategories(category.subCategories)}
            </React.Fragment>
        ));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };

    return (
        <>
            <div className={'flex px-4 mb-4 flex-row-reverse'}>
                <AddNewCategory handleReloadTable={handleReloadTable}></AddNewCategory>
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

            {loading ? (
                <Spinner/>
            ) : (
                <table className="min-w-full bg-white border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                        <th className="text-left text-nowrap py-4 px-6">No</th>
                        <th className="text-left text-nowrap py-4 px-6">Name</th>
                        <th className="text-left text-nowrap py-4 px-6">Parent Name</th>
                        <th className="text-left text-nowrap py-4 px-6">Description</th>
                        {/*<th className="text-left text-nowrap py-4 px-6">Created By</th>*/}
                        {/*<th className="text-left text-nowrap py-4 px-6">Create Time</th>*/}
                        {/*<th className="text-left text-nowrap py-4 px-6">Updated By</th>*/}
                        {/*<th className="text-left text-nowrap py-4 px-6">UpdateTime</th>*/}
                        <th className="text-left text-nowrap py-4 px-6">Status</th>
                        <th className="text-left text-nowrap py-4 px-6">Actions</th>
                        {/* Add more headers as needed */}
                    </tr>
                    </thead>
                    <tbody>{renderCategories(categories)}</tbody>
                </table>
            )}
        </>
    );
};

export default CategoriesTable;
