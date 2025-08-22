import MyAppointments from "../../components/AppointmentList";

const AppointmentsListPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <MyAppointments />
    </div>
  );
};

export default AppointmentsListPage;
