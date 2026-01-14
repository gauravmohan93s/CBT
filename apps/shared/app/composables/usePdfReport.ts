import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { TestInterfaceJsonOutput } from '#layers/shared/shared/types'

export const usePdfReport = () => {
  const generateReport = (resultData: TestInterfaceJsonOutput, studentName: string = 'Student', orgName: string = 'MockCBT') => {
    const doc = new jsPDF()
    const { testResultOverview, testSummary } = resultData

    // Header
    doc.setFontSize(20)
    doc.text(orgName, 14, 20)
    
    doc.setFontSize(14)
    doc.text('Student Performance Report', 14, 30)
    
    doc.setFontSize(10)
    doc.text(`Test Name: ${resultData.testConfig.testName}`, 14, 40)
    doc.text(`Student: ${studentName}`, 14, 45)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50)

    // Score Summary
    doc.setFontSize(12)
    doc.text('Score Summary', 14, 60)
    
    autoTable(doc, {
      startY: 65,
      head: [['Total Score', 'Max Score', 'Percentage', 'Status']],
      body: [[
        testResultOverview.totalMarks + '',
        testResultOverview.totalMaxMarks + '',
        testResultOverview.percentage + '%',
        testResultOverview.percentage >= 35 ? 'PASS' : 'FAIL' // Basic logic
      ]],
    })

    // Section Summary
    doc.text('Section Breakdown', 14, (doc as any).lastAutoTable.finalY + 10)
    
    const sectionBody = testSummary.map(s => [
      s.section,
      s.totalQuestions,
      s.answered,
      s.notAnswered,
      s.marked,
      s.notVisited
    ])

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [['Section', 'Total Qs', 'Answered', 'Not Ans', 'Marked', 'Not Visited']],
      body: sectionBody,
    })

    doc.save(`Report_${resultData.testConfig.testName}_${Date.now()}.pdf`)
  }

  return {
    generateReport
  }
}
