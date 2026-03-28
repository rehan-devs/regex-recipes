import React from 'react';
import { Check, X } from 'lucide-react';
import { EdgeCase } from '../../types';

interface EdgeCaseTableProps {
  edgeCases: EdgeCase[];
}

export function EdgeCaseTable({ edgeCases }: EdgeCaseTableProps) {
  const matches = edgeCases.filter((e) => e.shouldMatch);
  const failures = edgeCases.filter((e) => !e.shouldMatch);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground dark:text-foreground-dark">
        Edge Cases
      </h3>

      {matches.length > 0 && (
        <div>
          <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-2 flex items-center gap-1">
            <Check size={14} /> Matches
          </div>
          <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {matches.map((edge, i) => (
                  <tr
                    key={i}
                    className={`${i > 0 ? 'border-t border-border dark:border-border-dark' : ''}`}
                  >
                    <td className="px-3 py-2 font-mono text-foreground dark:text-foreground-dark bg-green-50 dark:bg-green-950/30 w-1/2">
                      {edge.input}
                    </td>
                    <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                      {edge.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {failures.length > 0 && (
        <div>
          <div className="text-xs font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-1">
            <X size={14} /> Does NOT match
          </div>
          <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {failures.map((edge, i) => (
                  <tr
                    key={i}
                    className={`${i > 0 ? 'border-t border-border dark:border-border-dark' : ''}`}
                  >
                    <td className="px-3 py-2 font-mono text-foreground dark:text-foreground-dark bg-red-50 dark:bg-red-950/30 w-1/2">
                      {edge.input}
                    </td>
                    <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                      {edge.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}