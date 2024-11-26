import Swal from "sweetalert2";
import ATMButtonField from "../../Component/Button/ATMButtonField";
import {
  useAddConfirmMutation,
  useCreateListMutation,
  useGetConfirmedListQuery,
  useGetListQuery,
  useListDeleteMutation,
} from "../../service/List";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import ATMTextField from "../../Component/Input/ATMTextField";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
const HomePage: React.FC = () => {
  const { data: list = { data: [] } }: any = useGetListQuery("");
  const { data: confirmedList = { data: [] } }: any =
    useGetConfirmedListQuery("");
  const [addList] = useCreateListMutation();
  const [addConfirmList] = useAddConfirmMutation();
  const [deleteTask] = useListDeleteMutation();
console.log(list)
  // Handle Confirm
  const confirm = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res: any = await addConfirmList({ id });
          if (res?.data.status) {
            toast.success(res?.data.msg);
          } else {
            toast.error(res?.data.msg);
          }
        } catch (error) {
          toast.error("Error confirming task.");
        }
      }
    });
  };

  // Handle Delete
  const del = async (id: string) => {
    if (!id) {
      toast.error("Task ID is required.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res: any = await deleteTask({ id });
          if (res?.data.status) {
            toast.success(res?.data.msg);
          } else {
            toast.error(res?.data.msg);
          }
        } catch (error: any) {
          console.error("Error during delete:", error);
          if (error.response) {
            toast.error(error.response.data?.msg || "Server error occurred.");
          } else {
            toast.error("Unexpected error occurred.");
          }
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Task Management System
      </h1>

      <Formik
        initialValues={{ listname: "" }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addList(values);
            toast.success("Task added successfully!");
            setSubmitting(false);
            
          } catch (error) {
            toast.error("Error adding task.");
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <ATMTextField
                type="text"
                name="listname"
                value={values.listname}
                onChange={handleChange}
                placeholder="Enter your task"
                inputSize="lg"
              />
              <ATMButtonField
                label="Add Task"
                type="submit"
                variant="success"
                size="lg"
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pending Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
          <ul className="space-y-2">
            {list?.data?.map((item: { _id: string; listname: string }) => (
              <li
                key={item?._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md"
              >
                <span>{item?.listname}</span>
                <div className="flex gap-2">
                  <ATMButtonField
                    onClick={() => confirm(item?._id)}
                    label={<GiConfirmed fontSize={30} />}
                    variant="primary"
                    size="sm"
                  />
                  <ATMButtonField
                    onClick={() => del(item?._id)}
                    label={<MdDelete fontSize={30} />}
                    variant="danger"
                    size="sm"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirmed Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Confirmed Tasks</h2>
          <ul className="space-y-2">
            {confirmedList?.data?.map(
              (item: { _id: string; listname: string }) => (
                <li
                  key={item?._id}
                  className="flex justify-between items-center bg-green-100 p-4 rounded shadow-md"
                >
                  <span>{item?.listname} (Confirmed)</span>
                  <ATMButtonField
                    onClick={() => del(item?._id)}
                    label={<MdDelete fontSize={30} />}
                    variant="danger"
                    size="sm"
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
