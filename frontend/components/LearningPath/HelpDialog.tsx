import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/UI'
import { HelpCircle } from 'lucide-react'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            How to Use Learn Git
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            A quick guide to get you started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Section title="🎯 Learning Mode">
            <p>
              Follow the step-by-step lessons in the sidebar. Each lesson
              teaches a specific Git concept with:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
              <li>Clear explanations of what the command does</li>
              <li>Example commands to try</li>
              <li>Real-time visual feedback</li>
              <li>Automatic completion when you execute the correct command</li>
            </ul>
          </Section>

          <Section title="💻 Interactive Terminal">
            <p>
              Type Git commands just like in a real terminal. The simulator
              supports:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
              <li>
                <code className="text-emerald-400">git init</code> - Initialize
                repository
              </li>
              <li>
                <code className="text-emerald-400">git add .</code> - Stage all
                files
              </li>
              <li>
                <code className="text-emerald-400">
                  git commit -m "message"
                </code>{' '}
                - Commit changes
              </li>
              <li>
                <code className="text-emerald-400">git status</code> - Check
                status
              </li>
              <li>
                <code className="text-emerald-400">help</code> - See all
                available commands
              </li>
            </ul>
          </Section>

          <Section title="📊 Visual Diagrams">
            <p>
              Watch how your files move through Git's three-stage architecture:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-1 text-slate-300">
              <li>Working Directory (blue) - Your modified files</li>
              <li>Staging Area (purple) - Files ready to commit</li>
              <li>Local Repository (green) - Committed snapshots</li>
              <li>Remote Repository (orange) - Shared on GitHub</li>
            </ol>
          </Section>

          <Section title="🎮 Playground Mode">
            <p>
              Once you're comfortable with the basics, switch to Playground Mode
              to experiment freely without following a specific lesson. Perfect
              for:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
              <li>Practicing commands you've learned</li>
              <li>Testing different workflows</li>
              <li>Building muscle memory</li>
            </ul>
          </Section>

          <Section title="📖 Cheat Sheet">
            <p>
              Quick reference for all Git commands organized by category. Use it
              to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
              <li>Look up command syntax</li>
              <li>Copy commands to clipboard</li>
              <li>See practical examples</li>
            </ul>
          </Section>

          <Section title="💡 Pro Tips">
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
              <li>Use ↑/↓ arrow keys to navigate command history</li>
              <li>
                Run 'git status' frequently to understand your repository state
              </li>
              <li>Read the lesson objectives before trying commands</li>
              <li>Don't worry about making mistakes - you can always reset!</li>
            </ul>
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-bold text-lg text-emerald-400 mb-2">{title}</h3>
      <div className="text-slate-300 space-y-2">{children}</div>
    </div>
  )
}
