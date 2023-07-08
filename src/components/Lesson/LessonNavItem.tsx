// import { Add } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import type { FC } from 'react';
// import { useEffect, useState } from 'react';

// import type { CategoryResponse } from '../../api/codesmooth-api';
// import { CodeSmoothApi } from '../../api/codesmooth-api';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { setSnackBar } from '../../features/auth/appSlice';
// import { incrementActionCount, selectCategories } from '../../features/auth/LessonNavSlice';
// import { generateLesson } from '../../utils/gen';
// import LessonMoreOptions from './LessonMoreOptions';

// interface LessonNavItemProps {
//   lesson: {
//     id: number;
//     title: string;
//     isCompleted?: boolean;
//   };
//   index: number;
//   course_category_id: number;
//   onClickLesson?: (lessonId: number) => void;
//   editMode?: boolean;
// }

// const LessonNavItem: FC<LessonNavItemProps> = (props) => {
//   const [isHover, setIsHover] = useState(false);
//   const [isSelecting, setIsSelecting] = useState(false);
//   const categories = useAppSelector<CategoryResponse[]>(selectCategories);
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (!router.isReady) return;
//     setIsSelecting(router.query.lessonid === props.lesson.id.toString());
//   }, [router.isReady, router.query.lessonid]);

//   const handleAddLesson = async () => {
//     try {
//       const newLesson = generateLesson(props.course_category_id);
//       const res = await CodeSmoothApi.addLesson({ ...newLesson, order: props.index + 1 });
//       // dispatch(
//       //   addLesson({
//       //     category_id: props.course_category_id,
//       //     index: props.index,
//       //     id: newLesson.id,
//       //     title: newLesson.title,
//       //   }),
//       // );
//       dispatch(incrementActionCount());
//     } catch (error: any) {
//       console.log(error);
//     }
//   };

//   const handleDeleteLesson = async () => {
//     try {
//       const catInclude = categories.find((category) => category.id === props.course_category_id);

//       if (catInclude?.lessons.length === 1 || !catInclude) {
//         setSnackBar({ message: 'Cannot delete last lesson', type: 'error' });
//         return;
//       }

//       await CodeSmoothApi.deleteLessonById(props.lesson.id);
//       const lessonIndex = catInclude?.lessons.findIndex((lesson) => lesson.id === props.lesson.id);

//       let nextLessonId;
//       if (catInclude.lessons?.length > lessonIndex) {
//         nextLessonId = catInclude.lessons[lessonIndex + 1]?.id;
//       } else {
//         nextLessonId = catInclude.lessons[lessonIndex - 1]?.id;
//       }

//       // dispatch(deleteLessonById(props.lesson.id));
//       router.push(`/editlesson/${router.query.courseid}/${nextLessonId}`);
//       setSnackBar({ message: 'Lesson deleted', type: 'success' });
//     } catch (error: any) {
//       setSnackBar({ message: error.message, type: 'error' });
//     }
//   };

//   return (
//     <div
//       key={props.lesson.id}
//       className={`flex cursor-pointer items-center py-1   ${
//         isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'
//       } ${!props.editMode && 'overflow-hidden'} pl-2`}
//       onClick={() => {
//         if (!props.onClickLesson) {
//           return;
//         }
//         props.onClickLesson(props.lesson.id);
//       }}
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//     >
//       <div className="flex min-h-[2rem] flex-row items-center">
//         <div className="flex items-center">
//           {props.editMode ? (
//             <div className="absolute bottom-3 z-0 h-[70px] w-7 rounded-b-full border-l-2 border-b-2 border-black"></div>
//           ) : (
//             <div className="absolute left-4 h-16 w-2 border-l border-black"></div>
//           )}
//           {!props.editMode && (
//             <div className={`z-30 py-1 ${isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'}`}>
//               <div
//                 className={`h-4 w-4 rounded-full  border-black ${
//                   props.lesson.isCompleted ? 'bg-green-500' : 'border'
//                 }`}
//               ></div>
//             </div>
//           )}
//           <div
//             className={`line-clamp-2 z-20 ml-4 flex ${props.editMode ? 'w-48' : 'w-full'} ${
//               isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'
//             } items-center justify-center overflow-hidden rounded-normal pl-2 `}
//           >
//             <span>{props.lesson.title}</span>
//           </div>
//         </div>
//       </div>
//       {isHover && props.editMode && (
//         <div
//           onClick={handleAddLesson}
//           className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition  duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
//         >
//           <Add style={{ fontSize: '20px' }} />
//         </div>
//       )}
//       {isHover && (
//         <LessonMoreOptions
//           onDeleteLesson={handleDeleteLesson}
//           editMode={props.editMode}
//           lesson={props.lesson}
//           setIsHoverParent={setIsHover}
//         />
//       )}
//     </div>
//   );
// };

// export default LessonNavItem;

const X = () => {
  return <div></div>;
};

export default X;
