import React, { Fragment, useContext, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

import { AuthContext } from "../../context/auth-context";

import Home from "../../../home/pages/Home";
import StudentList from "../../../students/pages/StudentList";
import StudentEdit from "../../../students/pages/StudentEdit";
import StudentCreate from "../../../students/pages/StudentCreate";
import StudentSubscription from "../../../students/pages/StudentSubscription";
import CourseList from "../../../courses/pages/CourseList";
import ThemeList from "../../../themes/pages/ThemeList";
import SectionList from "../../../sections/pages/SectionList";
import QuizCreate from "../../../quizzes/pages/QuizCreate";
import TeacherList from "../../../teachers/pages/TeacherList";
import TeacherCreate from "../../../teachers/pages/TeacherCreate";
import TeacherEdit from "../../../teachers/pages/TeacherEdit";
import CourseCreate from "../../../courses/pages/CourseCreate";
import ThemeCreate from "../../../themes/pages/ThemeCreate";
import SectionCreate from "../../../sections/pages/SectionCreate";
import ExamCreate from "../../../exams/pages/ExamCreate";
import CourseStudentList from "../../../courses/pages/CourseStudentList";
import CourseStudentExamsScore from "../../../courses/pages/CourseStudentExamsScore";
import CourseStudentQuizzesScore from "../../../courses/pages/CourseStudentQuizzesScore";
import CourseEdit from "../../../courses/pages/CourseEdit";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open, setOpen }) => {
  const [selectedLink, setSelectedLink] = useState("");

  const navigate = useNavigate();

  const { userRole } = useContext(AuthContext);

  const menu = useMemo(
    () => [
      ...(userRole === 1
        ? [
            {
              title: "Inicio",
              icon: <HomeIcon />,
              link: "home",
              component: (
                <Home link={"home"} setSelectedLink={setSelectedLink} />
              ),
            },
            {
              title: "Estudiantes",
              icon: <GroupIcon />,
              link: "students",
              component: (
                <StudentList
                  link={"students"}
                  setSelectedLink={setSelectedLink}
                />
              ),
            },
            {
              title: "Profesores",
              icon: <SchoolIcon />,
              link: "teachers",
              component: (
                <TeacherList
                  link={"teachers"}
                  setSelectedLink={setSelectedLink}
                />
              ),
            },
          ]
        : [
            {
              title: "Inicio",
              icon: <HomeIcon />,
              link: "home",
              component: (
                <Home link={"home"} setSelectedLink={setSelectedLink} />
              ),
            },
            {
              title: "Cursos",
              icon: <MenuBookIcon />,
              link: "courses",
              component: (
                <CourseList
                  path={"courses"}
                  setSelectedLink={setSelectedLink}
                />
              ),
            },
          ]),
    ],
    [userRole]
  );

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((item) => {
            return (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  selected={selectedLink === item.link}
                  onClick={() => navigate(item.link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {menu.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route path="/students/create" element={<StudentCreate />} />
          <Route path="/students/:id/edit" element={<StudentEdit />} />
          <Route
            path="/students/:id/subscription"
            element={<StudentSubscription />}
          />
          <Route path="/teachers/:id" element={<TeacherCreate />} />
          <Route path="/teachers/:id/edit" element={<TeacherEdit />} />
          <Route path="/courses/create" element={<CourseCreate />} />
          <Route path="/courses/:id/edit" element={<CourseEdit />} />
          <Route
            path="/courses/:cid/students"
            element={<CourseStudentList />}
          />
          <Route
            path="/courses/:cid/students/:eid/exams"
            element={<CourseStudentExamsScore />}
          />
          <Route
            path="/courses/:cid/students/:eid/quizzes"
            element={<CourseStudentQuizzesScore />}
          />
          <Route path="/courses/themes/:tid" element={<ThemeList />} />
          <Route path="/courses/themes/:tid/create" element={<ThemeCreate />} />
          <Route
            path="/courses/themes/:tid/sections/:sid"
            element={<SectionList />}
          />
          <Route
            path="/courses/themes/:tid/sections/:sid/create"
            element={<SectionCreate />}
          />
          <Route path="/courses/exam/:cid/create" element={<ExamCreate />} />
          <Route
            path="/courses/themes/:cid/quiz/:tid/create"
            element={<QuizCreate />}
          />
        </Routes>
      </Box>
    </Fragment>
  );
};

export default Sidebar;
