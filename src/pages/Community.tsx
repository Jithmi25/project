import React, { useState } from 'react';
import { Users, MapPin, Zap, TrendingUp, Award, Plus, Heart, MessageCircle } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('pools');

  const solarPools = [
    {
      id: 1,
      name: 'Kandy Green Energy Co-op',
      location: 'Kandy District',
      members: 45,
      capacity: '250 kW',
      generated: '2,847 kWh',
      investment: 'Rs. 50,000 min',
      returns: '12.5% APY',
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      progress: 78
    },
    {
      id: 2,
      name: 'Galle Solar Farm Initiative',
      location: 'Galle District',
      members: 32,
      capacity: '180 kW',
      generated: '1,923 kWh',
      investment: 'Rs. 25,000 min',
      returns: '11.8% APY',
      image: 'https://images.pexels.com/photos/9875474/pexels-photo-9875474.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      progress: 65
    },
    {
      id: 3,
      name: 'Colombo Community Solar',
      location: 'Colombo 07',
      members: 67,
      capacity: '400 kW',
      generated: '4,156 kWh',
      investment: 'Rs. 75,000 min',
      returns: '13.2% APY',
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'fundraising',
      progress: 45
    }
  ];

  const agriSolarProjects = [
    {
      id: 1,
      name: 'Rice & Solar Integration',
      farmer: 'K.M. Bandara',
      location: 'Polonnaruwa',
      cropType: 'Rice',
      landSize: '2.5 acres',
      solarCapacity: '100 kW',
      monthlyIncome: 'Rs. 45,000',
      image: 'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Vegetable Agri-Voltaics',
      farmer: 'S.P. Silva',
      location: 'Nuwara Eliya',
      cropType: 'Vegetables',
      landSize: '1.8 acres',
      solarCapacity: '75 kW',
      monthlyIncome: 'Rs. 38,000',
      image: 'https://images.pexels.com/photos/1459337/pexels-photo-1459337.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const communityUpdates = [
    {
      id: 1,
      author: 'Kandy Green Energy Co-op',
      content: 'Great news! We exceeded our monthly generation target by 15%. Thanks to all members! 🌞',
      time: '2 hours ago',
      likes: 24,
      comments: 8,
      type: 'achievement'
    },
    {
      id: 2,
      author: 'Nimal Perera',
      content: 'Just installed my new rooftop system. Looking forward to sharing excess energy with the community! ⚡',
      time: '5 hours ago',
      likes: 18,
      comments: 12,
      type: 'milestone'
    },
    {
      id: 3,
      author: 'SolarShare Admin',
      content: 'New feature: Real-time weather integration is now live! Get better solar predictions. 🌦️',
      time: '1 day ago',
      likes: 56,
      comments: 23,
      type: 'announcement'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Community Solar Hub
          </h1>
          <p className="text-gray-600">
            Connect with your community, join solar pools, and support agri-solar projects
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2.5MW</div>
                <div className="text-sm text-gray-600">Community Solar</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">85</div>
                <div className="text-sm text-gray-600">Communities</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12.5K</div>
                <div className="text-sm text-gray-600">CO₂ Tons Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-xl">
          <button
            onClick={() => setActiveTab('pools')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pools'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Solar Pools 🏊‍♂️
          </button>
          <button
            onClick={() => setActiveTab('agri')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'agri'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Agri-Solar 🌾
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'community'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Community Feed 📢
          </button>
        </div>

        {/* Solar Pools Tab */}
        {activeTab === 'pools' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Community Solar Pools</h2>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Pool</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solarPools.map((pool) => (
                <div key={pool.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={pool.image} 
                    alt={pool.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{pool.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{pool.location}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pool.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {pool.status === 'active' ? 'Active' : 'Fundraising'}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Members</div>
                        <div className="font-semibold text-gray-900">{pool.members}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Capacity</div>
                        <div className="font-semibold text-gray-900">{pool.capacity}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Generated</div>
                        <div className="font-semibold text-gray-900">{pool.generated}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Returns</div>
                        <div className="font-semibold text-green-600">{pool.returns}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Funding Progress</span>
                        <span className="font-medium">{pool.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${pool.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Min. Investment: <span className="font-semibold text-gray-900">{pool.investment}</span>
                      </div>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                        {pool.status === 'active' ? 'Join Pool' : 'Invest Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agri-Solar Tab */}
        {activeTab === 'agri' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Agri-Solar Projects</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>List Your Farm</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agriSolarProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                      <span>by {project.farmer}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Crop Type</div>
                        <div className="font-semibold text-gray-900">{project.cropType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Land Size</div>
                        <div className="font-semibold text-gray-900">{project.landSize}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Solar Capacity</div>
                        <div className="font-semibold text-gray-900">{project.solarCapacity}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Monthly Income</div>
                        <div className="font-semibold text-green-600">{project.monthlyIncome}</div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Support Project
                      </button>
                      <button className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Feed Tab */}
        {activeTab === 'community' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <textarea
                  placeholder="Share your solar journey, ask questions, or celebrate achievements..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                ></textarea>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <button className="text-orange-600 hover:text-orange-700 text-sm">📷 Photo</button>
                    <button className="text-orange-600 hover:text-orange-700 text-sm">⚡ Energy Data</button>
                  </div>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {communityUpdates.map((update) => (
                <div key={update.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{update.author}</h4>
                        <span className="text-sm text-gray-500">{update.time}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{update.content}</p>
                      
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{update.likes} likes</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{update.comments} comments</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;