
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Check, X, Trophy, User, Hash, Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock student data
const studentData = {
  name: "Alex Johnson",
  grade: "10th Grade",
  rollNumber: "2024-A-101",
  totalMarks: 847,
  maxMarks: 1000,
  rank: 12,
  percentage: 84.7
};

// Mock subject data with topics and chapters
const subjectData = {
  maths: {
    name: "Mathematics",
    topics: [
      {
        name: "Algebra",
        chapters: [
          { name: "Linear Equations", correct: 8, incorrect: 2, feedback: "Great understanding of basic concepts!" },
          { name: "Quadratic Equations", correct: 6, incorrect: 4, feedback: "" },
          { name: "Polynomial Functions", correct: 5, incorrect: 5, feedback: "Need more practice with complex polynomials" }
        ]
      },
      {
        name: "Geometry",
        chapters: [
          { name: "Triangles", correct: 9, incorrect: 1, feedback: "Excellent work on triangle properties" },
          { name: "Circles", correct: 7, incorrect: 3, feedback: "" },
          { name: "Coordinate Geometry", correct: 4, incorrect: 6, feedback: "" }
        ]
      },
      {
        name: "Statistics",
        chapters: [
          { name: "Mean & Median", correct: 8, incorrect: 2, feedback: "Strong grasp of central tendencies" },
          { name: "Probability", correct: 3, incorrect: 7, feedback: "" }
        ]
      }
    ]
  },
  english: {
    name: "English",
    topics: [
      {
        name: "Grammar",
        chapters: [
          { name: "Tenses", correct: 9, incorrect: 1, feedback: "Perfect understanding of verb tenses" },
          { name: "Voice & Speech", correct: 6, incorrect: 4, feedback: "" },
          { name: "Prepositions", correct: 7, incorrect: 3, feedback: "Good progress, keep practicing" }
        ]
      },
      {
        name: "Literature",
        chapters: [
          { name: "Poetry Analysis", correct: 5, incorrect: 5, feedback: "" },
          { name: "Prose Comprehension", correct: 8, incorrect: 2, feedback: "Excellent analytical skills" }
        ]
      }
    ]
  },
  science: {
    name: "Science",
    topics: [
      {
        name: "Physics",
        chapters: [
          { name: "Motion & Force", correct: 7, incorrect: 3, feedback: "Good understanding of mechanics" },
          { name: "Energy & Power", correct: 6, incorrect: 4, feedback: "" },
          { name: "Electricity", correct: 4, incorrect: 6, feedback: "" }
        ]
      },
      {
        name: "Chemistry",
        chapters: [
          { name: "Atomic Structure", correct: 8, incorrect: 2, feedback: "Strong foundation in atomic theory" },
          { name: "Chemical Bonding", correct: 5, incorrect: 5, feedback: "" }
        ]
      },
      {
        name: "Biology",
        chapters: [
          { name: "Cell Structure", correct: 9, incorrect: 1, feedback: "Outstanding grasp of cellular biology" },
          { name: "Genetics", correct: 6, incorrect: 4, feedback: "" }
        ]
      }
    ]
  }
};

const BattleAnalysis = () => {
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [feedbackData, setFeedbackData] = useState(subjectData);

  const getPerformanceColor = (correct, incorrect) => {
    const total = correct + incorrect;
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPerformanceStatus = (correct, incorrect) => {
    const total = correct + incorrect;
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (percentage >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Work', color: 'bg-red-100 text-red-800' };
  };

  const handleFeedbackSave = (subject, topicIndex, chapterIndex, newFeedback) => {
    setFeedbackData(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        topics: prev[subject].topics.map((topic, tIdx) => 
          tIdx === topicIndex 
            ? {
                ...topic,
                chapters: topic.chapters.map((chapter, cIdx) =>
                  cIdx === chapterIndex 
                    ? { ...chapter, feedback: newFeedback }
                    : chapter
                )
              }
            : topic
        )
      }
    }));
    setEditingFeedback(null);
  };

  const calculateTopicProgress = (chapters) => {
    const totalQuestions = chapters.reduce((sum, ch) => sum + ch.correct + ch.incorrect, 0);
    const totalCorrect = chapters.reduce((sum, ch) => sum + ch.correct, 0);
    return totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Sticky Student Summary */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Student</p>
                    <p className="font-semibold">{studentData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Grade</p>
                    <p className="font-semibold">{studentData.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Roll No.</p>
                    <p className="font-semibold">{studentData.rollNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Total Marks</p>
                    <p className="font-semibold">{studentData.totalMarks}/{studentData.maxMarks}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Rank</p>
                    <p className="font-semibold">#{studentData.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Percentage</p>
                    <p className="font-semibold">{studentData.percentage}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="maths" className="space-y-6">
          {/* Sticky Tab Navigation */}
          <div className="sticky top-32 z-10 bg-white/90 backdrop-blur-sm rounded-lg border border-purple-200 shadow-sm p-2">
            <TabsList className="grid w-full grid-cols-3 bg-purple-50">
              <TabsTrigger value="maths" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                📐 Mathematics
              </TabsTrigger>
              <TabsTrigger value="english" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                📚 English
              </TabsTrigger>
              <TabsTrigger value="science" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                🔬 Science
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          {Object.entries(feedbackData).map(([subjectKey, subject]) => (
            <TabsContent key={subjectKey} value={subjectKey} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-purple-800 mb-2">{subject.name} Performance</h2>
                <p className="text-purple-600">Detailed chapter-wise analysis and feedback</p>
              </div>

              {subject.topics.map((topic, topicIndex) => {
                const progress = calculateTopicProgress(topic.chapters);
                return (
                  <Card key={topicIndex} className="border-purple-200 shadow-sm">
                    <CardHeader className="bg-purple-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-purple-800 text-xl">{topic.name}</CardTitle>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-purple-600">
                            Progress: {Math.round(progress)}%
                          </div>
                          <Progress value={progress} className="w-24" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`topic-${topicIndex}`} className="border-0">
                          <AccordionTrigger className="px-6 py-4 hover:bg-purple-25">
                            <span className="text-purple-700">View {topic.chapters.length} Chapters</span>
                          </AccordionTrigger>
                          <AccordionContent className="p-6 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {topic.chapters.map((chapter, chapterIndex) => {
                                const status = getPerformanceStatus(chapter.correct, chapter.incorrect);
                                const total = chapter.correct + chapter.incorrect;
                                const percentage = Math.round((chapter.correct / total) * 100);
                                
                                return (
                                  <Card key={chapterIndex} className="border-2 hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg text-gray-800">
                                          📘 {chapter.name}
                                        </CardTitle>
                                        <Badge className={status.color}>{status.text}</Badge>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {/* Performance Metrics */}
                                      <div className="grid grid-cols-3 gap-3">
                                        <div className="text-center p-3 bg-green-50 rounded-lg">
                                          <div className="flex items-center justify-center gap-1 text-green-700 font-semibold">
                                            <Check className="w-4 h-4" />
                                            {chapter.correct}
                                          </div>
                                          <p className="text-xs text-green-600 mt-1">Correct</p>
                                        </div>
                                        <div className="text-center p-3 bg-red-50 rounded-lg">
                                          <div className="flex items-center justify-center gap-1 text-red-700 font-semibold">
                                            <X className="w-4 h-4" />
                                            {chapter.incorrect}
                                          </div>
                                          <p className="text-xs text-red-600 mt-1">Incorrect</p>
                                        </div>
                                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                                          <div className="text-purple-700 font-semibold">
                                            {percentage}%
                                          </div>
                                          <p className="text-xs text-purple-600 mt-1">Score</p>
                                        </div>
                                      </div>

                                      {/* Progress Bar */}
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">Performance</span>
                                          <span className="text-gray-800 font-medium">{chapter.correct}/{total}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${getPerformanceColor(chapter.correct, chapter.incorrect)}`}
                                            style={{ width: `${percentage}%` }}
                                          ></div>
                                        </div>
                                      </div>

                                      {/* Feedback Section */}
                                      <div className="border-t pt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">📝 Analysis & Feedback</h4>
                                        {editingFeedback === `${subjectKey}-${topicIndex}-${chapterIndex}` ? (
                                          <div className="space-y-2">
                                            <textarea
                                              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                              rows={3}
                                              defaultValue={chapter.feedback}
                                              placeholder="Add your feedback here..."
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.ctrlKey) {
                                                  handleFeedbackSave(subjectKey, topicIndex, chapterIndex, e.target.value);
                                                }
                                              }}
                                            />
                                            <div className="flex gap-2">
                                              <Button 
                                                size="sm" 
                                                onClick={(e) => {
                                                  const textarea = e.target.closest('.space-y-2').querySelector('textarea');
                                                  handleFeedbackSave(subjectKey, topicIndex, chapterIndex, textarea.value);
                                                }}
                                                className="bg-purple-600 hover:bg-purple-700"
                                              >
                                                Save
                                              </Button>
                                              <Button 
                                                size="sm" 
                                                variant="outline" 
                                                onClick={() => setEditingFeedback(null)}
                                              >
                                                Cancel
                                              </Button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div>
                                            {chapter.feedback ? (
                                              <div className="flex items-start justify-between gap-3 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-gray-700 flex-1">{chapter.feedback}</p>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() => setEditingFeedback(`${subjectKey}-${topicIndex}-${chapterIndex}`)}
                                                  className="flex-shrink-0 p-1 h-6 w-6 text-gray-500 hover:text-purple-600"
                                                >
                                                  <Edit className="w-3 h-3" />
                                                </Button>
                                              </div>
                                            ) : (
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setEditingFeedback(`${subjectKey}-${topicIndex}-${chapterIndex}`)}
                                                className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                                              >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add feedback
                                              </Button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default BattleAnalysis;
