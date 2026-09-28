import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import API from "../services/api";

function CourseStudents() {
  const { id } = useParams();

  const [students, setStudents] = useState([]);

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  async function getCourseStudents() {
    try {
      const courseResponse = await API.get(`/course/${id}`);

      if (courseResponse.data.success) {
        setCourse(courseResponse.data.data);
      }

      const response = await API.get(`/enrollment/course/${id}/students`);

      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (e) {
      console.log(e.message);

      toast.error(e.response?.data?.message || "Students could not be loaded");
    }

    setLoading(false);
  }

  useEffect(() => {
    getCourseStudents();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />

      <div className="w-11/12 max-w-6xl mx-auto py-12">
        <Link to="/teacher/profile" className="text-yellow-400 hover:underline">
          ← Teacher Profile
        </Link>

        {course && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>

            <p className="text-gray-400 mt-2">Enrolled Students</p>
          </div>
        )}

        {loading ? (
          <p className="text-yellow-400 mt-8">Loading students...</p>
        ) : (
          <div className="mt-8">
            <div className="bg-[#171717] border border-gray-800 rounded-lg p-5">
              <p className="text-gray-400">Total Students</p>

              <p className="text-3xl font-bold text-yellow-400 mt-1">
                {students.length}
              </p>
            </div>

            {students.length === 0 ? (
              <div className="bg-[#171717] border border-gray-800 rounded-lg p-10 text-center mt-6">
                <p className="text-gray-400">
                  No students have purchased this course yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 bg-[#171717] border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left text-gray-400 font-medium p-4">
                          #
                        </th>

                        <th className="text-left text-gray-400 font-medium p-4">
                          Student
                        </th>

                        <th className="text-left text-gray-400 font-medium p-4">
                          Email
                        </th>

                        <th className="text-left text-gray-400 font-medium p-4">
                          Amount
                        </th>

                        <th className="text-left text-gray-400 font-medium p-4">
                          Purchased
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {students.map((enrollment, index) => {
                        return (
                          <tr
                            key={enrollment._id}
                            className="border-b border-gray-800 last:border-b-0"
                          >
                            <td className="p-4 text-gray-400">{index + 1}</td>

                            <td className="p-4 text-white">
                              {enrollment.student?.name}
                            </td>

                            <td className="p-4 text-gray-400">
                              {enrollment.student?.email}
                            </td>

                            <td className="p-4 text-yellow-400">
                              ₹{enrollment.amount}
                            </td>

                            <td className="p-4 text-gray-400">
                              {enrollment.purchasedAt
                                ? new Date(
                                    enrollment.purchasedAt,
                                  ).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseStudents;
