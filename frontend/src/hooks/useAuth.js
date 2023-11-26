import { useSelector } from "react-redux";

export function useAuth() {
  const { nickname, fullName, email, uid } = useSelector((state) => state.user);

  return {
    isAuth: !!uid,
    nickname,
    fullName,
    email,
    uid,
  };
}
