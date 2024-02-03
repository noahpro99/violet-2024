import React from 'react'
import { DefaultService, InputResult, InputResultOutcome, MaternityRecord } from '../api';
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";
import Navbar from '../components/Navbar';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const TestResultCard: React.FC<{ result: InputResult, label: string }> = ({ result, label }) => {

  return (
    <div className='p-4 w-full'>
      <div className='flex flex-col w-full items-center justify-between py-2 border-2 border-[#f6a4ab] rounded-2xl px-4'>
        <div className='flex justify-between w-full'>
          <div className='text-lg font-semibold'>{label}</div>
          <div className={`text-lg font-semibold ${result.inputResultOutcome === InputResultOutcome.HIGH ? 'text-red-500' : 'text-green-500'}`}>{result.inputResultOutcome}</div>
        </div>
        <div className='font-semibold'>{result.recommendation}</div>
      </div>
    </div>
  );
};


export default function Result() {

  const [mRecords, setMRecords] = React.useState<MaternityRecord[] | null>(null);
  const [conductor, setConductor] = useState<TConductorInstance>();

  let { id } = useParams();

  conductor?.shoot();
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };


  React.useEffect(() => {
    DefaultService.getResultsResultsGet().then((res) => {
      setMRecords(res);
    });
  }, []);


  if (!mRecords) {
    return <Loading spinner />
  }
  console.log(mRecords);
  let record = mRecords.find((record) => record.id === id);
  console.log(record);

  if (!record) {
    return <Loading text="Record not found" />
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f7d2ce]">
      <div className="w-11/12 ">
        {record.result === 0 && <Fireworks onInit={onInit} />}
        <div className="text-center text-2xl font-bold mb-4 text-">Test Results</div>
        <div className="text-center mt-8">
          <div className="date text-lg">{record.date}</div>
          <div className={`risk-result text-xl font-semibold ${record.result === 2 ? 'text-red-500' : 'text-green-500'}`}>
            Risk: {record.result}
          </div>
        </div>
        {record.res_age.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_age} label="Age" />}
        {record.res_systolic_bp.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_systolic_bp} label="Systolic BP" />}
        {record.res_diastolic_bp.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_diastolic_bp} label="Diastolic BP" />}
        {record.res_bs.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_bs} label="Blood Sugar" />}
        {record.res_body_temp.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_body_temp} label="Body Temperature" />}
        {record.res_heart_rate.inputResultOutcome !== InputResultOutcome.NORMAL && <TestResultCard result={record.res_heart_rate} label="Heart Rate" />}
      </div>

      <Navbar />
    </div >
  )
}

