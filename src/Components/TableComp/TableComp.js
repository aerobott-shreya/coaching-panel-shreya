import React from 'react'
import Box from '@mui/material/Box';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';

function CustomPagination({ maxPage, currentPage, pageChange = () => { }, profile }) {
    const apiRef = useGridApiContext();
    console.log(apiRef, "APIREF")
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    const setPageState = (v) => {
        console.log(v, "setPageState");
        pageChange(v, profile)
    }

    return (
        <Pagination
            color="primary"
            // count={pageCount}
            page={+currentPage}
            // onChange={(event, value) => apiRef.current.setPage(value - 1)}
            count={maxPage}
            // size="large"
            // variant="outlined"
            // shape="rounded"
            onChange={(e, value) => setPageState(value)}
        />
    );
}

function TableComp({ rows, columns,currentPage, handledata = () => { }, pageChange = () => { }, profile, maxPage, pageSize }) {

    const handleOnCellClick = (params) => {
        console.log(params,profile, "ParamsData")
        handledata(params.row.id, params , profile)
    }

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                // pagination
                pageSize={pageSize}
                // rowsPerPageOptions={[5]}
                onCellClick={handleOnCellClick}
                components={{
                    Pagination: (props) => <CustomPagination {...props} maxPage={maxPage} currentPage={currentPage} pageChange={pageChange} profile={profile} />,
                }}
                style={{ cursor: 'pointer' }}
            />
        </Box>
    )
}

export default TableComp