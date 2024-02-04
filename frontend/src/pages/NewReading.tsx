import React from 'react'
import Navbar from '../components/Navbar'
import { DefaultService } from '../api';
import { useNavigate } from 'react-router-dom';
import { Slider } from "../components/ui/slider";


export default function NewReading() {
  let [error, setError] = React.useState<string | null>(null);
  let [loading, setLoading] = React.useState<boolean>(false);
  let [systolicBP, setSystolicBP] = React.useState<number>(110);
  let [diastolicBP, setDiastolicBP] = React.useState<number>(75);
  let [bs, setBs] = React.useState<number>(10.0);
  let [bodyTemp, setBodyTemp] = React.useState<number>(100.0);
  let [heartRate, setHeartRate] = React.useState<number>(80);

  let navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    DefaultService.predictPredictPost({
      SystolicBP: systolicBP,
      DiastolicBP: diastolicBP,
      BS: bs,
      BodyTemp: bodyTemp,
      HeartRate: heartRate,
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
              <Slider id='systolic_bp' max={150} min={70} defaultValue={[110]} onValueChange={(value) => setSystolicBP(value[0])} />
              <div className="text-md whitespace-nowrap">{systolicBP} mmHg</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Diastolic Blood Pressure
            </label>
            <div className="flex flex-row">
              <Slider id='diastolic_bp' max={115} min={35} defaultValue={[75]} onValueChange={(value) => setDiastolicBP(value[0])} />
              <div className="text-md whitespace-nowrap">{diastolicBP} mmHg</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Blood Sugar
            </label>
            <div className="flex flex-row">
              <Slider id='bs' max={20} min={0} itemType='float' defaultValue={[10]} onValueChange={(value) => setBs(value[0])} />
              <div className="text-md whitespace-nowrap">{bs} mmol/L</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Body Temperature
            </label>
            <div className="flex flex-row">
              <Slider id='body_temp' max={104} min={96} itemType='float' defaultValue={[100.0]} onValueChange={(value) => setBodyTemp(value[0])} />
              <div className="text-md whitespace-nowrap">{bodyTemp} °F</div>
            </div>
          </div>
          <div className="">
            <label className="text-gray-600">
              Heart Rate
            </label>
            <div className="flex flex-row">
              <Slider id='heart_rate' max={180} min={20} defaultValue={[100]} onValueChange={(value) => setHeartRate(value[0])} />
              <div className="text-md whitespace-nowrap">{heartRate} bpm</div>
            </div>
          </div>
          <button
            className="w-full h-10 sm:h-12 rounded-xl shadow-xl bg-blue-500 text-white font-medium transition-colors hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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