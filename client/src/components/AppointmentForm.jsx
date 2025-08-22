import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { getBarbers } from "../services/user.js";
import { AuthContext } from "../context/authContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { getAvailableTimes } from "../services/appointment.js";

const AppointmentForm = () => {
  const { user } = useContext(AuthContext);

  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState("");

  // Traer lista de barberos (admins)
  useEffect(() => {
    getBarbers()
      .then((data) => setBarbers(data))
      .catch((err) => console.error(err));
  }, []);

  // Actualizar horarios disponibles cuando cambian barber o fecha
 useEffect(() => {
  if (!selectedBarber || !date) return;

  getAvailableTimes(selectedBarber, date).then(setAvailableTimes);
}, [selectedBarber, date]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBarber || !date || !time) {
      setMessage("Please select barber, date and time.");
      return;
    }

    try {
      const formattedDate = format(date, "yyyy-MM-dd");

      await API.post("/appointments", {
        barberId: selectedBarber,
        date: formattedDate,
        time,
        user,
      });

      setMessage("Appointment created successfully!");
      // Reset form
      setSelectedBarber("");
      setDate(null);
      setTime("");
      setAvailableTimes([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating appointment.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Barbero */}
        <select
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Barber --</option>
          {barbers.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Fecha */}
        <div>
          <label className="block mb-1">Select day</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            filterDate={(d) => d.getDay() !== 0} // bloquear domingos
            minDate={new Date()} // no permitir fechas pasadas
            dateFormat="yyyy-MM-dd"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Hora */}
        <div>
          <label className="block mb-1">Select Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select --</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!selectedBarber || !date || !time}
          className={`w-full p-2 rounded text-white ${
            !selectedBarber || !date || !time
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Book Appointment
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
