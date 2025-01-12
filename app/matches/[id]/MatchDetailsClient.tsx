"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Progress } from '@/components/ui/progress';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function MatchDetailsClient({ matchId }: { matchId: string }) {

  // Fetch match details based on matchId
  // For now, using mock data
  const matchDetails = {
    id: matchId,
    player1: { name: 'Ma Long', winPercentage: 65, pointsWon: 1250, setsWon: 45, aces: 10, faults: 3 },
    player2: { name: 'Fan Zhendong', winPercentage: 62, pointsWon: 1180, setsWon: 42, aces: 8, faults: 5 },
    time: '2023-06-01 15:00',
    winProbability: 0.55,
    totalPoints: 85,
    headToHead: [
      { date: '2023-01-15', result: '3-2', winner: 'Ma Long' },
      { date: '2022-11-20', result: '3-1', winner: 'Fan Zhendong' },
      { date: '2022-09-05', result: '4-2', winner: 'Ma Long' },
    ],
  };

  // Data for the charts
  const playerStats = {
    labels: ['Points Won', 'Sets Won', 'Aces', 'Faults'],
    datasets: [
      {
        label: matchDetails.player1.name,
        data: [matchDetails.player1.pointsWon, matchDetails.player1.setsWon, matchDetails.player1.aces, matchDetails.player1.faults],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: matchDetails.player2.name,
        data: [matchDetails.player2.pointsWon, matchDetails.player2.setsWon, matchDetails.player2.aces, matchDetails.player2.faults],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const winPercentageData = {
    labels: [matchDetails.player1.name, matchDetails.player2.name],
    datasets: [
      {
        data: [matchDetails.player1.winPercentage, matchDetails.player2.winPercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Match Details</h1>
      
      {/* Card with basic match info */}
      <Card>
        <CardHeader>
          <CardTitle>{matchDetails.player1.name} vs {matchDetails.player2.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Time: {matchDetails.time}</p>
          <p>Win Probability for {matchDetails.player1.name}: {(matchDetails.winProbability * 100).toFixed(2)}%</p>
          <p>Predicted Total Points: {matchDetails.totalPoints}</p>
        </CardContent>
      </Card>

      {/* Bar Chart for Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Player Statistics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px' }}>
            <Bar data={playerStats} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart for Win Percentage */}
      <Card>
        <CardHeader>
          <CardTitle>Win Percentage</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <Pie data={winPercentageData} options={{ responsive: true }} />
          </div>
        </CardContent>
      </Card>

      {/* Player Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Player Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statistic</TableHead>
                <TableHead>{matchDetails.player1.name}</TableHead>
                <TableHead>{matchDetails.player2.name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell>Win Percentage</TableCell>
                <TableCell>
                  <Progress value={matchDetails.player1.winPercentage} className="w-[60%] mr-2" />
                  {matchDetails.player1.winPercentage}%
                </TableCell>
                <TableCell>
                  <Progress value={matchDetails.player2.winPercentage} className="w-[60%] mr-2" />
                  {matchDetails.player2.winPercentage}%
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell>Points Won</TableCell>
                <TableCell>{matchDetails.player1.pointsWon}</TableCell>
                <TableCell>{matchDetails.player2.pointsWon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sets Won</TableCell>
                <TableCell>{matchDetails.player1.setsWon}</TableCell>
                <TableCell>{matchDetails.player2.setsWon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aces</TableCell>
                <TableCell>{matchDetails.player1.aces}</TableCell>
                <TableCell>{matchDetails.player2.aces}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Faults</TableCell>
                <TableCell>{matchDetails.player1.faults}</TableCell>
                <TableCell>{matchDetails.player2.faults}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Head-to-Head History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Head-to-Head History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Winner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchDetails.headToHead.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.result}</TableCell>
                  <TableCell>{match.winner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
