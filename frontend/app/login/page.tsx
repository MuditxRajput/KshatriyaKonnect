"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Crown, Shield, ArrowLeft, AwardIcon } from "lucide-react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux';
import { setUser } from "@/store/userSlice"
import toast from "react-hot-toast"
import { useAuth } from "../hooks/useAuth"
import { useProfile } from "../hooks/useProfile"
import { useRouter } from "next/navigation"
export default function LoginPage() {
  const router =useRouter();
  const  {login} = useAuth();
  const {getprofile} = useProfile();
  const {user} = useSelector((state:any)=>state.profile);
  const[visible,setVisible] = useState(false);
  const [formdata,setFormData] = useState({
    email :'',
    password :'',
  })
  const handleChange=(e:any)=>{
  const name  = e.target.name;
  const value = e.target.value;
  setFormData((pre)=>({...pre,[name]:value}));
  }
  const handleSubmit=async()=>{
    try {
      const res = await login(formdata);
    if(!res.success)
      {
        toast.error('error failed');
        return;
      } 
      else{
        toast.success('Login success');
         getprofile();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    
  }
  useEffect(()=>{
   if(user) router.push('./home')
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Shield className="w-32 h-32 text-amber-600" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Crown className="w-40 h-40 text-red-600" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="border-amber-200 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                KshatriyaKonnect
              </CardTitle>
            </div>
            <p className="text-gray-600">Welcome back, Royal Member</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  value={formdata.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className ="flex relative">
                  <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  onChange={handleChange}
                />
                {
                  visible ? (
                    <FaEyeSlash
                      onClick={() => setVisible(false)}
                      className="absolute right-0 mt-3 mr-2 cursor-pointer"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setVisible(true)}
                      className="absolute right-0 mt-3 mr-2 cursor-pointer"
                    />
                  )
                }
                </div>
                
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
                  Remember me
                </label>
                <Link href="#" className="text-amber-700 hover:text-amber-800">
                  Forgot password?
                </Link>
              </div>

              <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 py-3">
                Sign In
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-amber-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-amber-200 hover:bg-amber-50 bg-transparent">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full border-amber-200 hover:bg-amber-50 bg-transparent">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-amber-700 hover:text-amber-800 font-medium">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Cultural Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
            <p className="text-amber-800 italic text-sm">"वीरता, सत्य और सम्मान - राजपूत के तीन स्तंभ"</p>
            <p className="text-amber-700 text-xs mt-1">Valor, Truth and Honor - The Three Pillars of Rajput</p>
          </div>
        </div>
      </div>
    </div>
  )
}
