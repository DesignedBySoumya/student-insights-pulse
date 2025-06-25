
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Brain, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface WeakChapter {
  subject: string;
  subjectIcon: string;
  chapter: string;
  accuracy: number;
  correct: number;
  incorrect: number;
  total: number;
  learnings: string;
  whatWentWrong: string;
}

const ReviewWeakChapters = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weakChapters, setWeakChapters] = useState<WeakChapter[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('pts-report-data');
    if (savedData) {
      try {
        const reportData = JSON.parse(savedData);
        const chapters: WeakChapter[] = [];
        
        Object.entries(reportData).forEach(([subjectKey, subject]: [string, any]) => {
          subject.chapters.forEach((chapter: any) => {
            const correct = Number(chapter.correct) || 0;
            const incorrect = Number(chapter.incorrect) || 0;
            const total = correct + incorrect;
            const accuracy = total > 0 ? (correct / total) * 100 : 0;
            
            // Filter chapters with accuracy < 60% or that have mistakes
            if ((accuracy < 60 && total > 0) || incorrect > 0) {
              chapters.push({
                subject: subject.name,
                subjectIcon: subject.icon,
                chapter: chapter.name,
                accuracy: Math.round(accuracy),
                correct,
                incorrect,
                total,
                learnings: chapter.learnings || '',
                whatWentWrong: chapter.whatWentWrong || ''
              });
            }
          });
        });
        
        // Sort by accuracy (lowest first)
        chapters.sort((a, b) => a.accuracy - b.accuracy);
        setWeakChapters(chapters);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleAddToFlashcards = (chapter: WeakChapter) => {
    if (chapter.whatWentWrong) {
      toast({
        title: "🧠 Added to flashcards!",
        description: `${chapter.subject} - ${chapter.chapter} mistakes sent to flashcard system`,
      });
    } else {
      toast({
        title: "No mistakes noted",
        description: "Add 'What went wrong' notes first to create effective flashcards",
        variant: "destructive"
      });
    }
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy < 40) return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    if (accuracy < 60) return <Badge className="bg-orange-100 text-orange-800">Needs Work</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800">Improve</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/pts-report-card')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report Card
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              Review Weak Chapters
            </h1>
            <p className="text-gray-600">Focus on chapters that need improvement</p>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Chapters to Review</h3>
                <p className="text-2xl font-bold">{weakChapters.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Critical Areas</h3>
                <p className="text-2xl font-bold">
                  {weakChapters.filter(ch => ch.accuracy < 40).length}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Accuracy</h3>
                <p className="text-2xl font-bold">
                  {weakChapters.length > 0 
                    ? Math.round(weakChapters.reduce((sum, ch) => sum + ch.accuracy, 0) / weakChapters.length)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weak Chapters Table */}
        <Card>
          <CardHeader>
            <CardTitle>Chapters Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            {weakChapters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No weak chapters found. Great job!</p>
                <p className="text-sm text-gray-400">All your chapters have accuracy ≥ 60%</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>What Went Wrong</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weakChapters.map((chapter, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{chapter.subjectIcon}</span>
                          <span className="font-medium">{chapter.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{chapter.chapter}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getAccuracyBadge(chapter.accuracy)}
                          <span className="text-xs text-gray-500">
                            {chapter.correct}/{chapter.total} correct
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${
                          chapter.accuracy < 40 ? 'text-red-600' : 
                          chapter.accuracy < 60 ? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {chapter.accuracy}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {chapter.whatWentWrong ? (
                            <p className="text-sm text-gray-600">{chapter.whatWentWrong}</p>
                          ) : (
                            <span className="text-xs text-gray-400">No notes added</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToFlashcards(chapter)}
                          className="flex items-center gap-1"
                        >
                          <Brain className="w-3 h-3" />
                          Add to Flashcards
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewWeakChapters;
