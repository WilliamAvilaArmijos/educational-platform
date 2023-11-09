import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import MaterialReactTable from "material-react-table";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
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

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    const getCourses = async () => {
      if (!courses.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/courses/me/teacher?page=${
            pagination.pageIndex
          }&pagesize=${pagination.pageSize}&keyword=${globalFilter ?? ""}`,
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

        setCourses(data.courses);
        setRowCount(data.count);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
      setIsRefetching(false);
    };

    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize, globalFilter]);

  const deleteRowHandler = useCallback(
    async (row) => {
      const storeData = JSON.parse(localStorage.getItem("userData"));

      try {
        await new Promise((resolve, reject) => {
          if (window.confirm("¿Está seguro de borrar el curso?")) {
            resolve();
          } else {
            return;
          }
        });

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/courses/${row.id}/status`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${storeData.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      }

      courses.splice(row.index, 1);
      setCourses([...courses]);
    },
    [courses]
  );

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
        accessorKey: "price",
        header: "Precio",
      },
      {
        id: "students",
        header: "Ver Estudiantes",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`${row.id}/students`);
            }}
          >
            Ver estudiantes
          </Button>
        ),
      },
      {
        id: "exam",
        header: "Crear examen",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`exam/${row.id}/create`);
            }}
          >
            Crear examen
          </Button>
        ),
      },
      {
        id: "themes",
        header: "Ver Temas",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`themes/${row.id}`);
            }}
          >
            Ver Temas
          </Button>
        ),
      },
      {
        id: "edit",
        header: "Editar",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/dashboard/courses/${row.id}/edit`);
            }}
          >
            Editar
          </Button>
        ),
      },
      {
        id: "delete",
        header: "Eliminar",
        Cell: ({ row }) => (
          <Button variant="contained" onClick={() => deleteRowHandler(row)}>
            Eliminar
          </Button>
        ),
      },
    ],
    [navigate, deleteRowHandler]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={courses}
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
              Crear nuevo curso
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

export default CourseList;
