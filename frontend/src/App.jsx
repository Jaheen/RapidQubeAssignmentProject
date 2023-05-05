import AuthPageGuard from "guards/AuthPageGuard";
import ProtectedPageGuard from "guards/ProtectedPageGuard";
import CarBookingPage from "pages/CarBookingPage";
import CarDetailsPage from "pages/CarDetailsPage";
import CarsListPage from "pages/CarsListPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import SignupPage from "pages/SignupPage";
import SplashScreenPage from "pages/SplashScreenPage";
import ThankyouPage from "pages/ThankyouPage";
import TodosPage from "pages/TodosPage";
import { useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "scss/global.scss";


/**
 * Top most component
 */
export default function App() {

  const [splashScreenOpen, setSplashScreenOpen] = useState(true)
  const rootRef = useRef(null)

  // set max height to fix 100vh problem on mobile browsers
  const setPageHeight = () => {
    if (rootRef.current)
      rootRef.current.style.height = `${window.innerHeight}px`
  }

  useLayoutEffect(() => {
    setPageHeight()

    // window.screen.orientation.onchange = () => setPageHeight()
    // when screen rotates or goes full screen update height accordingly
    window.onresize = () => setPageHeight()
  }, [])

  return (
    <div className="App" ref={rootRef}>
      {splashScreenOpen ? <SplashScreenPage onClose={() => setSplashScreenOpen(false)} /> : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedPageGuard page={<HomePage />} />} />
            <Route path="/login" element={<AuthPageGuard page={<LoginPage />} />} />
            <Route path="/signup" element={<AuthPageGuard page={<SignupPage />} />} />
            <Route path="/todos" element={<ProtectedPageGuard page={<TodosPage />} />} />
            <Route path="/car-booking" element={<ProtectedPageGuard page={<CarBookingPage />} />} />
            <Route path="/car-booking/cars/:stateName/:districtName" element={<ProtectedPageGuard page={<CarsListPage />} />} />
            <Route path="/car-booking/cars/:stateName/:districtName/:carId" element={<ProtectedPageGuard page={<CarDetailsPage />} />} />
            <Route path="/car-booking/thankyou" element={<ProtectedPageGuard page={<ThankyouPage />} />} />
            {/* 404 page for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}
