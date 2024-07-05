import {useEffect, useState} from "react";
import useAuth from "../../../../hooks/useAuth.hook.ts";
import {ICourseQueryParameters} from "../../../../types/course.types.ts";


const CoursesTable = () => {
    const {user} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState([]);
    const [reload, setReload] = useState<boolean>(true);
    const [query, setQuery] = useState<ICourseQueryParameters>({
        instructorId: null,
        filterOn: 'title',
        filterQuery: '',
        sortBy: '',
        pageSize: 5,
        pageNumber: 1,
        isAscending: true,
    });

    useEffect(() => {
        try {

        } catch (error){

        }
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default CoursesTable;