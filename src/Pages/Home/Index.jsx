import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../../Components/navbar";

export default function Index() {
  const [cookies, removeCookie] = useCookies(["token"]);
  let navigate = useNavigate();
  return(
    <Navbar>
    </Navbar>
  );
}
