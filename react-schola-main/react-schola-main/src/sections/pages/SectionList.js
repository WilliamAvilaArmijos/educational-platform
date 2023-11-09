import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import MaterialReactTable from "material-react-table";

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getSections = async () => {
      if (!sections.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/sections/me/${
            params.sid
          }/teacher?page=${pagination.pageIndex}&pagesize=${
            pagination.pageSize
          }&keyword=${globalFilter ?? ""}`,
          {
            headers: {
              Authorization: `Bearer ${storeData.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSections(data.sections);
        setRowCount(data.count);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
      setIsRefetching(false);
    };

    getSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize, globalFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
      {
        accessorKey: "createdAt",
        header: "Fecha de creación",
      },     
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={sections}
      getRowId={(row) => row.id}
      rowCount={rowCount}
      manualPagination
      manualFiltering
      enableColumnActions={false}
      enableColumnFilters={false}
      onPaginationChange={setPagination}
      onGlobalFilterChange={setGlobalFilter}
      muiTablePaperProps={{
        sx: {
          display: { lg: "grid", md: "grid", sm: "grid", xs: "grid" },
        },
      }}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <div style={{ display: "flex", gap: "0.5rem", paddingTop: "3px" }}>
            <Button
              onClick={() => {
                navigate("create");
              }}
              variant="contained"
            >
              Crear nueva clase
            </Button>
          </div>
        );
      }}
      muiToolbarAlertBannerProps={
        !!error
          ? {
              color: "error",
              children: error,
            }
          : undefined
      }
      state={{
        isLoading: isLoading,
        pagination: pagination,
        globalFilter: globalFilter,
        showProgressBars: isRefetching,
        showAlertBanner: !!error,
      }}
    />
  );
};

export default SectionList;
