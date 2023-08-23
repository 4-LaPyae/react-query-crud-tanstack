import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTourApi, deleteTourApi, tourapi } from "./tourapi";
import { useForm } from "react-hook-form";
import { useTourStore } from "../../store";

const Tour = () => {
  const name = useTourStore((state) => state.name);
  const chname = useTourStore((state) => state.changeName);

  console.log(name);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: tours,
    isError,
    error,
  } = useQuery(["tours"], tourapi);
  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createTourApi,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["tours"] });
      },
    }
  );
  const { mutate: delteMutate, isLoading: deleteLoading } = useMutation(
    deleteTourApi,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["tours"] });
      },
    }
  );
  const changeHanler = () => {
    chname("helo");
  };
  const onSubmit = (data) => {
    createMutate(data);
  };
  const deleteHandler = (e, id) => {
    e.preventDefault();
    delteMutate(id);
  };
  console.log(tours?.data?.tours);

  return (
    <>
      <h1>{name}</h1>
      <button onClick={changeHanler}>chage</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
        <input type="number" {...register("price", { required: true })} />
        {errors.price && <span>This field is required</span>}
        <input type="submit" />
      </form>
      {isLoading && <p>Loading...</p>}
      {tours?.data?.tours.map((t) => (
        <div key={t._id}>
          <h2>{t.name}</h2>
          <p>{t.price}</p>
          <span>
            <button
              disabled={deleteLoading}
              onClick={(e) => deleteHandler(e, t._id)}
            >
              delete
            </button>
          </span>
        </div>
      ))}
      <h1>{name}</h1>
    </>
  );
};
export default Tour;
