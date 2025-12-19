const [schedules, setSchedules] = useState([]);

const fetchData = async () => {
  const res = await axios.get("http://localhost:5000/api/schedules");
  setSchedules(res.data);
};

useEffect(() => {
  fetchData();
}, []);
