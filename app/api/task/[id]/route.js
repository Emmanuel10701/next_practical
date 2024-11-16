// pages/api/tasks/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const taskId = parseInt(req.query.id);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch a single task by ID
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);

    } else if (req.method === 'PUT') {
      const { completed } = req.body;
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid value for completed' });
      }
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { completed },
      });
      res.json({ message: 'Task updated successfully', task: updatedTask });

    } else if (req.method === 'DELETE') {
      await prisma.task.delete({
        where: { id: taskId },
      });
      res.json({ message: 'Task deleted successfully' });

    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
