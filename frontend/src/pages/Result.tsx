import React from 'react'
import { DefaultService, InputResultOutcome, MaternityRecord } from '../api';
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";
import Navbar from '../components/Navbar';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const TestResultCard: React.FC<{ result: InputResultOutcome, label: string }> = ({ result, label }) => {

  return (
    <div className='p-2 w-full'>
      <div className='flex flex-col w-full items-center justify-between py-2 border-2 border-blue-500 rounded-2xl px-4'>
        <div className='flex justify-between w-full items-center'>
          {/* svg up arrow */}
          <div className='text-lg font-semibold'>{label}</div>

          {result === InputResultOutcome.HIGH && <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>}
          {result === InputResultOutcome.LOW && <svg className={`w-3 h-6 text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>}
          {/* green dot for normal */}
          {result === InputResultOutcome.NORMAL && <div className='w-3 h-3 mx-1 bg-green-500 rounded-full'></div>}
        </div>
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

  let resultIntToStr = [
    "Low",
    "Medium",
    "High"
  ]


  return (
    <div className="flex flex-col items-center min-h-screen bg-[white]">
      <div className="w-11/12 ">
        {record.result === 0 && <Fireworks onInit={onInit} />}
        <div className="text-center text-2xl font-bold mb-4 text-">Test Results</div>
        <div className="text-center mt-8">
          <div className="date text-lg">{record.date}</div>
          <div className={`risk-result text-xl font-semibold ${record.result === 2 ? 'text-red-500' : 'text-green-500'}`}>
            Risk: {resultIntToStr[record.result]}
          </div>
        </div>
        <TestResultCard result={record.res_age} label="Age" />
        <TestResultCard result={record.res_systolic_bp} label="Systolic BP" />
        <TestResultCard result={record.res_diastolic_bp} label="Diastolic BP" />
        <TestResultCard result={record.res_bs} label="Blood Sugar" />
        <TestResultCard result={record.res_body_temp} label="Body Temperature" />
        <TestResultCard result={record.res_heart_rate} label="Heart Rate" />

        {/* put response */}
        <div className='p-3 w-full'>
          <div className='flex flex-col w-full items-center justify-between py-2 border-2 border-blue-500 rounded-2xl px-4'>
            <div className="text-center text-2xl font-bold mb-4">Recommendations</div>
            {record.recommendation.split('\n').map((line, index) => {
              return (
                <div>
                  <p key={index} className="text-center">{line}</p>
                  <br />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='py-10'></div>

      <Navbar />
    </div >
  )
}

