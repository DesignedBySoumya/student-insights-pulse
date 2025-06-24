
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, User, Hash, Target, TrendingUp, Clock, CheckCircle, XCircle, Brain, Map, Share, Download, RefreshCw, FileText } from 'lucide-react';

// Mock analyzed data (would come from PTS Report Card in real app)
const battleResults = {
  student: {
    name: "Priya Sharma",
    mockNo: "PTS-2024-15",
    rank: 45,
    totalMarks: 156,
    maxMarks: 200,
    percentile: 78.5,
    totalTime: 180, // minutes
    overallAccuracy: 78
  },
  subjects: {
    maths: {
      name: "Mathematics",
      icon: "📐",
      color: "blue",
      totalQuestions: 48,
      attempted: 45,
      correct: 32,
      incorrect: 13,
      timeSpent: 52,
      totalMarks: 48,
      accuracy: 71,
      status: "Good",
      strongChapters: ["Percentage", "Average", "Number System"],
      weakChapters: ["Geometry", "Trigonometry", "Data Interpretation"],
      chapters: [
        { name: "Percentage", correct: 3, incorrect: 0, status: "excellent" },
        { name: "Profit Loss & Discount", correct: 2, incorrect: 1, status: "good" },
        { name: "Geometry", correct: 1, incorrect: 2, status: "weak" },
        { name: "Trigonometry", correct: 0, incorrect: 3, status: "weak" },
        { name: "Average", correct: 3, incorrect: 0, status: "excellent" }
      ]
    },
    english: {
      name: "English",
      icon: "📖",
      color: "purple",
      totalQuestions: 30,
      attempted: 28,
      correct: 24,
      incorrect: 4,
      timeSpent: 35,
      totalMarks: 36,
      accuracy: 86,
      status: "Excellent",
      strongChapters: ["Grammar", "Reading Comprehension", "Synonyms"],
      weakChapters: ["Cloze Test"],
      chapters: [
        { name: "Error Spotting", correct: 4, incorrect: 1, status: "good" },
        { name: "Reading Comprehension", correct: 5, incorrect: 0, status: "excellent" },
        { name: "Cloze Test", correct: 2, incorrect: 3, status: "weak" },
        { name: "Synonyms", correct: 4, incorrect: 0, status: "excellent" }
      ]
    },
    reasoning: {
      name: "Reasoning",
      icon: "🧠",
      color: "orange",
      totalQuestions: 35,
      attempted: 33,
      correct: 26,
      incorrect: 7,
      timeSpent: 45,
      totalMarks: 39,
      accuracy: 79,
      status: "Good",
      strongChapters: ["Number Series", "Analogy", "Blood Relation"],
      weakChapters: ["Syllogism", "Coding Decoding"],
      chapters: [
        { name: "Number Series", correct: 4, incorrect: 0, status: "excellent" },
        { name: "Syllogism", correct: 1, incorrect: 3, status: "weak" },
        { name: "Analogy", correct: 3, incorrect: 1, status: "good" },
        { name: "Coding Decoding", correct: 2, incorrect: 3, status: "weak" }
      ]
    },
    gkgs: {
      name: "GK/GS",
      icon: "🌍",
      color: "green",
      totalQuestions: 25,
      attempted: 23,
      correct: 16,
      incorrect: 7,
      timeSpent: 28,
      totalMarks: 24,
      accuracy: 70,
      status: "Good",
      strongChapters: ["History", "Static GK"],
      weakChapters: ["Current Affairs", "Economics"],
      chapters: [
        { name: "History", correct: 4, incorrect: 1, status: "good" },
        { name: "Current Affairs", correct: 1, incorrect: 3, status: "weak" },
        { name: "Static GK", correct: 3, incorrect: 0, status: "excellent" },
        { name: "Economics", correct: 2, incorrect: 3, status: "weak" }
      ]
    }
  }
};

const BattleAnalysis = () => {
  const [expandedSubject, setExpandedSubject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'weak': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChipColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSubjectStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Needs Work': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Battle Victory Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center text-white mb-8">
            <div className="inline-block animate-bounce mb-4">
              <div className="text-6xl">🏆</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Battle Completed!</h1>
            <p className="text-xl opacity-90">Victory Analysis Report</p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Warrior</p>
                    <p className="font-bold text-gray-800">{battleResults.student.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Battle ID</p>
                    <p className="font-bold text-gray-800">{battleResults.student.mockNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Rank</p>
                    <p className="font-bold text-gray-800">#{battleResults.student.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="font-bold text-gray-800">{battleResults.student.totalMarks}/{battleResults.student.maxMarks}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Percentile</p>
                    <p className="font-bold text-gray-800">{battleResults.student.percentile}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-bold text-gray-800">{battleResults.student.totalTime}min</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">
                    Overall Accuracy: {battleResults.student.overallAccuracy}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subject Battle Cards */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">⚔️ Battle Territory Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(battleResults.subjects).map(([subjectKey, subject]) => (
            <Card key={subjectKey} className="border-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{subject.icon}</span>
                    <div>
                      <CardTitle className="text-xl text-gray-800">{subject.name}</CardTitle>
                      <Badge className={getSubjectStatusColor(subject.status)}>{subject.status}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{subject.accuracy}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-800">{subject.attempted}/{subject.totalQuestions}</span>
                  </div>
                  <Progress value={(subject.attempted / subject.totalQuestions) * 100} className="h-3" />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-green-700 font-bold">{subject.correct}</div>
                    <div className="text-xs text-green-600">Correct</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-red-700 font-bold">{subject.incorrect}</div>
                    <div className="text-xs text-red-600">Wrong</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-700 font-bold">{subject.timeSpent}m</div>
                    <div className="text-xs text-blue-600">Time</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-purple-700 font-bold">{subject.totalMarks}</div>
                    <div className="text-xs text-purple-600">Marks</div>
                  </div>
                </div>

                {/* Chapter Chips */}
                <Accordion type="single" collapsible>
                  <AccordionItem value={subjectKey} className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 hover:no-underline">
                      View Chapter Details ({subject.chapters.length} chapters)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subject.chapters.map((chapter, idx) => {
                          const total = chapter.correct + chapter.incorrect;
                          const chapterAccuracy = total > 0 ? Math.round((chapter.correct / total) * 100) : 0;
                          
                          return (
                            <div
                              key={idx}
                              className={`px-3 py-2 rounded-full text-white text-sm font-medium ${getChipColor(chapter.status)} hover:scale-105 transition-transform cursor-pointer`}
                              title={`${chapter.name}: ${chapterAccuracy}% (${chapter.correct}/${total})`}
                            >
                              {chapter.name} ({chapterAccuracy}%)
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Insights Panel */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Brain className="w-6 h-6" />
              AI Battle Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                <strong>💡 Analysis:</strong> You performed excellently in English (86% accuracy) and showed good consistency in Reasoning (79%). 
                Focus areas include Geometry and Trigonometry in Math, and Current Affairs in GK/GS. 
                Your time management was efficient across all subjects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🏆 Strengths</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• English Grammar</li>
                  <li>• Number Series</li>
                  <li>• Percentage & Average</li>
                </ul>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Focus Areas</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Geometry concepts</li>
                  <li>• Current Affairs</li>
                  <li>• Syllogism reasoning</li>
                </ul>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📚 Next Steps</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Practice Geometry daily</li>
                  <li>• Read current affairs</li>
                  <li>• Solve more syllogisms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Battle Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Map className="w-6 h-6" />
              Battle Territory Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(battleResults.subjects).map(([subjectKey, subject]) => (
                <div key={subjectKey} className="text-center">
                  <h4 className="font-semibold text-gray-700 mb-3">{subject.name}</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {subject.chapters.map((chapter, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full ${getChipColor(chapter.status)} flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform`}
                        title={chapter.name}
                      >
                        {idx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Mastered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Needs Work</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg p-4 rounded-t-xl">
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Weak Chapters
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Detailed Report
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleAnalysis;
