"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Crown, Upload, ArrowLeft, Plus, X } from "lucide-react"
import { useState } from "react"
import { permanentRedirect } from "next/navigation"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"

export default function ProfileSetupPage() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    age: '',
    location: '',
    bio: '',
    gotra: '',
    place_of_Origin: '',
    looking_for: '',
    interestedIn : '',
    education:''

  })
  const [images, setImages] = useState<File[]>([]);
  const handleData = (e:any) => {
     const name = e.target.name;
     const value = e.target.value;
     setFormData((pre)=>({...pre,[name]:value}));
  }
  const handleUploadMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImages((pre) => {
      const updated = [...pre];
      updated[0] = file;
      return updated;
    });
  }
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImages((pre) => {
      const updated = [...pre];
      updated.push(file);
      return updated;
    });
  }
  const handleSubmit=async(e:any)=>{
    setLoading(true);
    const formdata = new FormData();
    formdata.append('firstname',formData.firstname);
    formdata.append('lastname',formData.lastname);
    formdata.append('age',formData.age);
    formdata.append('gender',formData.gender);
    formdata.append('bio',formData.bio);
    formdata.append('gotra',formData.gotra);
    formdata.append('location',formData.location);
    formdata.append('looking_for',formData.looking_for);
    formdata.append('place_of_Origin',formData.place_of_Origin);
    formdata.append('interestedIn',formData.interestedIn);
    formdata.append('education',formData.education);
    images?.map((val)=>formdata.append('photo',val));
    console.log('FormData contents:');
    const val = await fetch('http://localhost:3000/api/profile/new',{
      method:"POST",
      body : formdata,
      credentials : 'include'
    });
    const res = await val.json();
    if(!res.success) toast.error('Something went wrong');
    else {
      setLoading(false);
      dispatch(setUser(res.profile_data));
      toast.success('Profile created');
      window.location.href ='./home'
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
              KshatriyaKonnect
            </span>
          </div>
        </div>

        <Card className="border-amber-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Create Your Royal Profile</CardTitle>
            <p className="text-gray-600">Let's set up your profile to find your perfect match</p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Profile Photos</Label>
              <div className="grid grid-cols-3 gap-4">
                {/* Main Photo */}
                {
                  images[0] ? (<div className="col-span-2 row-span-2">
                    <img
                      src={URL.createObjectURL(images[0])}
                      alt="Main Preview"
                      className="w-full h-full object-cover rounded-lg aspect-[3/4]"
                    />
                  </div>) : <>
                    <label className="col-span-2 row-span-2 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleUploadMain}
                      />
                      <div className="col-span-2 row-span-2">
                        <div className="aspect-[3/4] border-2 border-dashed border-amber-300 rounded-lg flex flex-col items-center justify-center bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-amber-600 mb-2" />
                          <p className="text-sm text-amber-700 font-medium">Main Photo</p>
                          <p className="text-xs text-amber-600">Recommended</p>
                        </div>
                      </div>
                    </label>
                  </>
                }
                {/* Additional Photos */}
                {[1, 2, 3, 4].map((i) => (
                  images[i] ? <img src={URL.createObjectURL(images[i])} alt="" /> :  <label key={i} className="">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                    />
                    <div
                      className="aspect-square border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      <Plus className="w-6 h-6 text-amber-600" />
                    </div>
                  </label>
                 

                ))}
              </div>
              <p className="text-sm text-gray-500">Upload 2-6 photos. First photo will be your main profile picture.</p>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Basic Information</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    name="firstname"
                    onChange={handleData}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    name="lastname"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    onChange={handleData}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    onChange={handleData}
                  >
                    <option value=""  >Select Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="25"
                    onChange={handleData}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-slate-500 text-xs">Age should me more than 16</span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    name="location"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    onChange={handleData}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Interested in</Label>
                  <select
                    id="intrested"
                    name="interestedIn"
                    className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    onChange={handleData}
                  >
                    <option value=""  >Select Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="both">both</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <select
                    id="education"
                    name="education"
                    className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    onChange={handleData}
                  >
                    <option value=""  >Select </option>
                    <option value="12th">12th</option>
                    <option value="graduate">Graduate</option>
                    <option value="master">Master</option>
                    <option value="job">Job</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">About You</Label>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 min-h-[120px]"
                  onChange={handleData}
                  name="bio"
                />
                <p className="text-sm text-gray-500">Write a brief description about yourself (max 500 characters)</p>
              </div>
            </div>
            {/* Rajput Heritage */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Rajput Heritage</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clan">Clan/Gotra</Label>
                  <Input
                    id="clan"
                    placeholder="e.g., Chauhan, Rathore, Sisodiya"
                    name="gotra"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    onChange={handleData}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Place of Origin</Label>
                  <Input
                    id="origin"
                    name="place_of_Origin"
                    placeholder="e.g., Rajasthan, Gujarat"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    onChange={handleData}
                  />
                </div>
              </div>
            </div>

            {/* Looking For */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Looking For</Label>
              <div className="flex flex-wrap gap-2">
                {["Serious Relationship", "Friendship", "Casual Dating", "Marriage"].map((option) => (
                  <Badge
                    key={option}
                    variant="outline"
                    className="cursor-pointer border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={()=>setFormData((pre)=>({...pre,looking_for:option}))}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                Save as Draft
              </Button>
              {loading ? <Button disabled className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 ">
                  <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
              </Button>
               :<Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800">
                  Complete Profile
                </Button> }
                
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
