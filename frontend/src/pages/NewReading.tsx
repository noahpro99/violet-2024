import React from 'react'
import Navbar from '../components/Navbar'
import { DefaultService } from '../api';
import { useNavigate } from 'react-router-dom';
import { Slider } from "../components/ui/slider";


export default function NewReading() {
  let [error, setError] = React.useState<string | null>(null);
  let [loading, setLoading] = React.useState<boolean>(false);
  let [systolicBP, setSystolicBP] = React.useState<number>(50);
  let [diastolicBP, setDiastolicBP] = React.useState<number>(50);
  let [bs, setBs] = React.useState<number>(50);
  let [bodyTemp, setBodyTemp] = React.useState<number>(50);
  let [heartRate, setHeartRate] = React.useState<number>(50);

  let navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.age.value || !e.currentTarget.systolic_bp.value || !e.currentTarget.diastolic_bp.value ||
      !e.currentTarget.bs.value || !e.currentTarget.body_temp.value || !e.currentTarget.heart_rate.value) {
      setError('Please fill in all the fields');
      return;
    }
    setLoading(true);
    setError(null);

    DefaultService.predictPredictPost({
      Age: 0,
      SystolicBP: e.currentTarget.systolic_bp.value,
      DiastolicBP: e.currentTarget.diastolic_bp.value,
      BS: e.currentTarget.bs.value,
      BodyTemp: e.currentTarget.body_temp.value,
      HeartRate: e.currentTarget.heart_rate.value
    }).then((res) => {
      console.log(res);
      setLoading(false);
      setError(null);
      navigate(`/result/${res.id}`);
    }).catch((err) => {
      setLoading(false);
      setError(err.message);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">

      {error && <div className="border-2 rounded-xl border-red-400 text-red-400 p-4">{error}</div>}
      {loading && <div className="border-2 rounded-xl border-blue-500 text-blue-500 p-4">Loading...</div>}

      <div className=" p-4 text-gray-600 rounded-md w-5/6">
        <h2 className="text-xl sm:text-2xl p-2 font-bold text-blue-500">Input Your Data</h2>
        <form className="space-y-4 text-sm sm:text-lg border-2 rounded-xl border-blue-500 p-4" onSubmit={handleOnSubmit}>
          <div className="">
            <label className="text-gray-600">
              Systolic Blood Pressure
            </label>
            <div className="flex flex-row">
              <Slider id='systolic_bp' max={100} min={0} defaultValue={[50, 0]} onValueChange={(value) => setSystolicBP(value[0])} />
              <div className="text-xl">{systolicBP}</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Diastolic Blood Pressure
            </label>
            <div className="flex flex-row">
              <Slider id='diastolic_bp' max={100} min={0} defaultValue={[50, 0]} onValueChange={(value) => setDiastolicBP(value[0])} />
              <div className="text-xl">{diastolicBP}</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Blood Sugar
            </label>
            <div className="flex flex-row">
              <Slider id='bs' max={100} min={0} defaultValue={[50, 0]} onValueChange={(value) => setBs(value[0])} />
              <div className="text-xl">{bs}</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Body Temperature
            </label>
            <div className="flex flex-row">
              <Slider id='body_temp' max={100} min={0} defaultValue={[50, 0]} onValueChange={(value) => setBodyTemp(value[0])} />
              <div className="text-xl">{bodyTemp}</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Heart Rate
            </label>
            <div className="flex flex-row">
              <Slider id='heart_rate' max={100} min={0} defaultValue={[50, 0]} onValueChange={(value) => setHeartRate(value[0])} />
              <div className="text-xl">{heartRate}</div>
            </div>
          </div>
          <button
            className="w-full h-10 sm:h-12 rounded-md bg-blue-500 text-white font-medium shadow-lg transition-colors hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            type="submit"
          >
            Submit Data
          </button>
        </form>
      </div>
      <Navbar />
    </div>
  )
}