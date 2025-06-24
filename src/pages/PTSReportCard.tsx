import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Edit, Save, Check, Trophy, User, Hash, Target, TrendingUp, Send, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

// Mock student data for PTS Report
const studentInfo = {
  name: "Priya Sharma",
  mockNo: "PTS-2024-15",
  rank: 45,
  totalMarks: 156,
  maxMarks: 200,
  percentile: 78.5
};

// PTS Report Card subject structure with chapters
const ptsSubjects = {
  maths: {
    name: "Mathematics",
    icon: "📐",
    color: "blue",
    chapters: [
      { name: "Percentage", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Profit Loss & Discount", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Ratio & Proportion", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Mixtures & Alligation", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Average", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Time & Work", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Time, Speed, Distance", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Geometry", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Simplification", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Number System", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Algebra", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Trigonometry", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Mensuration", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "LCM & HCF", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Data Interpretation", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "CI / SI", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" }
    ]
  },
  english: {
    name: "English",
    icon: "📖",
    color: "purple",
    chapters: [
      { name: "Error Spotting", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Sentence Improvement", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Fill in the Blanks", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Voice", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Narration", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Antonyms", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Synonyms", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Idioms & Phrases", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Cloze Test", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Reading Comprehension", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" }
    ]
  },
  gkgs: {
    name: "GK/GS",
    icon: "🌍",
    color: "green",
    chapters: [
      { name: "History", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Geography", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Polity", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Science", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Economics", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Static GK", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Current Affairs", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" }
    ]
  },
  reasoning: {
    name: "Reasoning",
    icon: "🧠",
    color: "orange",
    chapters: [
      { name: "Number Series", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Alphabet Series", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Analogy", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Syllogism", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Mirror / Water Image", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Dictionary", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Classifications", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Dice", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Figure Related", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Odd One Out", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Clock", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "BODMAS", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Blood Relation", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Coding Decoding", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Calendar", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Matrix", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Mathematical Operations", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Word Coding", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Ranking & Sitting Arrangement", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" },
      { name: "Venn Diagram", correct: 0, incorrect: 0, timeSpent: 0, marks: 0, whatWentWrong: "", learnings: "" }
    ]
  }
};

const PTSReportCard = () => {
  const [subjectData, setSubjectData] = useState(ptsSubjects);
  const [editingField, setEditingField] = useState(null);
  const navigate = useNavigate();

  const getPerformanceStatus = (correct, incorrect) => {
    const total = correct + incorrect;
    if (total === 0) return { text: 'Not Attempted', color: 'bg-gray-100 text-gray-800' };
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (percentage >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Work', color: 'bg-red-100 text-red-800' };
  };

  const updateChapterData = (subjectKey, chapterIndex, field, value) => {
    setSubjectData(prev => ({
      ...prev,
      [subjectKey]: {
        ...prev[subjectKey],
        chapters: prev[subjectKey].chapters.map((chapter, idx) =>
          idx === chapterIndex 
            ? { ...chapter, [field]: field === 'correct' || field === 'incorrect' || field === 'timeSpent' || field === 'marks' ? Number(value) || 0 : value }
            : chapter
        )
      }
    }));
  };

  const calculateSubjectStats = (chapters) => {
    const totalQuestions = chapters.reduce((sum, ch) => sum + ch.correct + ch.incorrect, 0);
    const attempted = chapters.filter(ch => ch.correct + ch.incorrect > 0).length;
    const totalCorrect = chapters.reduce((sum, ch) => sum + ch.correct, 0);
    const totalIncorrect = chapters.reduce((sum, ch) => sum + ch.incorrect, 0);
    const totalTime = chapters.reduce((sum, ch) => sum + ch.timeSpent, 0);
    const totalMarks = chapters.reduce((sum, ch) => sum + ch.marks, 0);
    
    return {
      totalQuestions,
      attempted,
      correct: totalCorrect,
      incorrect: totalIncorrect,
      timeSpent: totalTime,
      totalMarks,
      percentage: totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0
    };
  };

  const handleSubmit = () => {
    // Navigate to battle analysis with the current data
    navigate('/battle-analysis', { state: { reportData: subjectData, studentInfo } });
  };

  const handleClear = () => {
    // Reset all data to initial state
    const clearedData = JSON.parse(JSON.stringify(ptsSubjects));
    setSubjectData(clearedData);
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
                    <p className="font-semibold">{studentInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Mock No.</p>
                    <p className="font-semibold">{studentInfo.mockNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Rank</p>
                    <p className="font-semibold">#{studentInfo.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Total Marks</p>
                    <p className="font-semibold">{studentInfo.totalMarks}/{studentInfo.maxMarks}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-200" />
                  <div>
                    <p className="text-sm text-purple-200">Percentile</p>
                    <p className="font-semibold">{studentInfo.percentile}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">PTS Mock Test Report Card</h1>
          <p className="text-purple-600">Enter your performance data and analyze your results</p>
        </div>

        <div className="space-y-6">
          {Object.entries(subjectData).map(([subjectKey, subject]) => {
            const stats = calculateSubjectStats(subject.chapters);
            const colorMap = {
              blue: 'border-blue-200 bg-blue-50',
              purple: 'border-purple-200 bg-purple-50',
              green: 'border-green-200 bg-green-50',
              orange: 'border-orange-200 bg-orange-50'
            };

            return (
              <Card key={subjectKey} className={`${colorMap[subject.color]} shadow-lg`}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={subjectKey} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>Total: {stats.totalQuestions}</span>
                              <span>Attempted: {stats.attempted}</span>
                              <span>Correct: {stats.correct}</span>
                              <span>Incorrect: {stats.incorrect}</span>
                              <span>Time: {stats.timeSpent}min</span>
                              <span>Marks: {stats.totalMarks}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Progress</div>
                            <div className="font-bold">{Math.round(stats.percentage)}%</div>
                          </div>
                          <Progress value={stats.percentage} className="w-16" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subject.chapters.map((chapter, chapterIndex) => {
                          const status = getPerformanceStatus(chapter.correct, chapter.incorrect);
                          const total = chapter.correct + chapter.incorrect;
                          const percentage = total > 0 ? Math.round((chapter.correct / total) * 100) : 0;

                          return (
                            <Card key={chapterIndex} className="border-2 hover:shadow-md transition-shadow bg-white">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg text-gray-800">{chapter.name}</CardTitle>
                                  <Badge className={status.color}>{status.text}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {/* Input Fields */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs text-gray-600 mb-1 block">✅ Correct</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={chapter.correct}
                                      onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'correct', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-600 mb-1 block">❌ Incorrect</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={chapter.incorrect}
                                      onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'incorrect', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-600 mb-1 block">🕒 Time (min)</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={chapter.timeSpent}
                                      onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'timeSpent', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-600 mb-1 block">🎯 Marks</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={chapter.marks}
                                      onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'marks', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded text-center"
                                    />
                                  </div>
                                </div>

                                {/* Progress Bar */}
                                {total > 0 && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Accuracy</span>
                                      <span className="text-gray-800 font-medium">{percentage}%</span>
                                    </div>
                                    <Progress value={percentage} className="h-2" />
                                  </div>
                                )}

                                {/* What Went Wrong */}
                                <div>
                                  <label className="text-xs text-gray-600 mb-1 block">❓ What went wrong?</label>
                                  <Textarea
                                    placeholder="Identify mistakes and areas of confusion..."
                                    value={chapter.whatWentWrong}
                                    onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'whatWentWrong', e.target.value)}
                                    className="resize-none text-sm"
                                    rows={2}
                                  />
                                </div>

                                {/* Learnings */}
                                <div>
                                  <label className="text-xs text-gray-600 mb-1 block">💡 Strategy for next time</label>
                                  <Textarea
                                    placeholder="What will you do differently next time?"
                                    value={chapter.learnings}
                                    onChange={(e) => updateChapterData(subjectKey, chapterIndex, 'learnings', e.target.value)}
                                    className="resize-none text-sm"
                                    rows={2}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            );
          })}
        </div>

        {/* Submit and Clear Buttons */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-purple-200 shadow-lg p-4 rounded-t-xl mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit & Analyze Results
            </Button>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Clear All Data
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Submit your data to see detailed battle analysis and insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTSReportCard;
