'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Crown,
  Edit3,
  Camera,
  Shield,
  Bell,
  Lock,
  Eye,
  Heart,
  MessageCircle,
  Smartphone,
  Mail,
  User,
  Plus,
  X,
} from "lucide-react"
import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { setUser } from "@/store/userSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
export default function SettingsPage() {
  const [visibility, setVisibility] = useState(false);
  const { user } = useSelector((state: any) => state.profile);
  const [existingImages, setExistingImages] = useState(user?.photo);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  
  const [formData, setFormData] = useState({
    bio: user.bio,
    location: user?.location,
    education: user?.education,
    age: user?.age,
    replaceIndex : [] as string[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((pre) => ({ ...pre, [name]: value }));
  }
 const handleSaveChanges=async()=>{
  const data = new FormData();
  data.append("bio", formData.bio);
  data.append("location", formData.location);
  data.append("education", formData.education);
  data.append("age", formData.age);
  data.append("replaceIndex", JSON.stringify(formData.replaceIndex));
 newImages.forEach(file => data.append('photo', file));
   const val = await fetch('http://localhost:3000/api/profile/update',{
    method : 'PATCH',
    body: data,
    credentials: 'include',
   });
   const res = await val.json();
    if(res.success){
      
      dispatch(setUser(res.data));
      window.location.reload();
  setVisibility(false);
 }
}
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600">Manage your royal profile and preferences</p>
                </div>
              </div>

              {/* Profile Section */}
              <Card className="border-amber-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-amber-600" />
                      Profile Information
                    </CardTitle>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800"
                      onClick={() => setVisibility(true)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Photos */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold text-gray-900">Profile Photos</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                          onClick={() => setVisibility(true)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                      {/* Main Photo */}
                      <div className="relative">
                        <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-red-300 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-amber-800">
                              <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-red-300 rounded-lg overflow-hidden relative">
                                <img
                                  src={existingImages?.[0]?.url || (newImages[0] && URL.createObjectURL(newImages[0]))}
                                  className="w-full h-full object-cover"
                                  alt="Main"
                                  style={{ opacity: visibility ? 0.7 : 1, cursor: visibility ? "pointer" : "default" }}
                                  onClick={() => {
                                    if (visibility) 
                                      {
                                        mainFileInputRef.current?.click();
                                        setFormData((pre)=>({
                                          ...pre,
                                          replaceIndex: pre.replaceIndex.includes(existingImages?.[0]?.public_id)
                                            ? pre.replaceIndex
                                            : [...pre.replaceIndex, existingImages?.[0]?.public_id]
                                        }));
                                      }
                                  }}
                                />
                                {visibility && (
                                  <input
                                    type="file"
                                    ref={mainFileInputRef}
                                    className="hidden"
                                    onChange={e => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      setNewImages(prev => {
                                        const updated = [...prev];
                                        updated[0] = file;
                                        return updated;
                                      });
                                      setExistingImages((prev: any[] | null) => {
                                        const updated = prev ? [...prev] : [];
                                        updated[0] = null;
                                        return updated;
                                      });
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Photos */}
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="relative">
                            <div className="aspect-square bg-gradient-to-br from-amber-200 to-red-300 rounded-lg overflow-hidden">
                              <img
                                src={
                                  newImages[i]
                                    ? URL.createObjectURL(newImages[i])
                                    : existingImages?.[i]?.url
                                }
                                alt="User"
                                className="w-full h-full object-cover"
                                style={{ opacity: visibility ? 0.7 : 1, cursor: visibility ? "pointer" : "default" }}
                                onClick={() => {
                                  if (visibility) {
                                    additionalFileInputRefs[i - 1].current?.click();
                                    setFormData((pre) => ({
                                      ...pre,
                                      replaceIndex: pre.replaceIndex.includes(existingImages?.[i]?.public_id)
                                        ? pre.replaceIndex
                                        : [...pre.replaceIndex, existingImages?.[i]?.public_id]
                                    }));
                                  }
                                }}
                              />
                              {visibility && (
                                <input
                                  type="file"
                                  ref={additionalFileInputRefs[i - 1]}
                                  className="hidden"
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setNewImages(prev => {
                                      const updated = [...prev];
                                      updated[i] = file;
                                      return updated;
                                    });
                                    setExistingImages((prev: any[] | null) => {
                                      const updated = prev ? [...prev] : [];
                                      updated[i] = null;
                                      return updated;
                                    });
                                  }}
                                />
                              )}
                            </div>
                            {visibility && (existingImages?.[i]?.url || newImages[i]) && (
                              <Button
                                size="icon"
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full"
                                onClick={() => {
                                  setNewImages(prev => {
                                    const updated = [...prev];
                                    updated.splice(i, 1);
                                    return updated;
                                  });
                                  setExistingImages(prev => {
                                    const updated = [...prev];
                                    updated[i] = null;
                                    return updated;
                                  });
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {/* Add new image */}
                        {visibility && (
                          <div className="aspect-square border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
                            <input
                              type="file"
                              hidden
                              ref={addFileInputRef}
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setNewImages(prev => [...prev, file]);
                              }}
                            />
                            <Plus
                              onClick={() => addFileInputRef.current?.click()}
                              className="w-6 h-6 text-amber-600 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold text-gray-900">Basic Information</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={user?.firstname}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={user?.lastname}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          {visibility ? <Input
                            id="age"
                            value={formData?.age}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            name="age"
                            onChange={handleChange}
                          /> : <Input
                            id="age"
                            value={user?.age}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            readOnly
                          />}
                          
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          {
                            visibility ?
                            <Input
                            id="location"
                            value={formData?.location}
                            name="location"
                            onChange={handleChange}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                             : <Input
                            id="location"
                            value={user?.location}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            readOnly
                          />
                          }
                          
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        {visibility ? <Textarea
                          id="bio"
                          value={formData?.bio}
                          name="bio"
                          onChange={handleChange}
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                          
                        /> : <Textarea
                          id="bio"
                          value={user?.bio}
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                          readOnly
                        /> }
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {visibility ? <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <select
                            id="education"
                            name="education"
                            className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            onChange={handleChange}
                          >
                            <option value=""  >{formData?.education} </option>
                            <option value="12th">12th</option>
                            <option value="graduate">Graduate</option>
                            <option value="master">Master</option>
                            <option value="job">Job</option>
                          </select>
                        </div> : <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <Input
                            id="education"
                            value={user?.education}
                            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                            readOnly
                          />
                        </div>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rajput Heritage */}
              <Card className="border-amber-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-600" />
                      Rajput Heritage
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clan">Clan/Gotra</Label>
                      <Input
                        id="clan"
                        value={user?.gotra}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origin">Place of Origin</Label>
                      <Input
                        id="origin"
                        value={user?.place_of_Origin}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Badge className="bg-gradient-to-r from-amber-600 to-red-700 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      {user?.gotra} Rajput
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="border-amber-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-amber-600" />
                      Interests & Preferences
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">


                  <Separator className="bg-amber-200" />

                  <div>
                    <Label className="text-base font-medium text-gray-900 mb-3 block">Looking For</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Serious Relationship", "Friendship", "Casual Dating", "Marriage"].map((option) => (
                        <Badge
                          key={option}
                          variant={option === user?.looking_for ? "default" : "outline"}
                          className={`cursor-pointer ${option === user?.looking_for
                            ? "bg-gradient-to-r from-amber-600 to-red-700"
                            : "border-amber-300 text-amber-700 hover:bg-amber-50"
                            }`}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              {/* Privacy Settings */}
              {/* Notification Settings */}
              {/* Account Actions */}
              <Card className="border-amber-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-200">
                  <CardTitle className="text-xl text-gray-900">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </Button>
                </CardContent>
              </Card>

              {/* Save Changes Button */}
              {visibility && <div className="flex justify-end gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Cancel Changes
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div> }
              
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
